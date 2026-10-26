import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const GLB_MAGIC = 0x46546c67;
const JSON_CHUNK = 0x4e4f534a;
const BIN_CHUNK = 0x004e4942;

const COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16,
};

const COMPONENT_BYTES = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4,
};

const COMPONENT_NAMES = {
  5120: 'BYTE',
  5121: 'UNSIGNED_BYTE',
  5122: 'SHORT',
  5123: 'UNSIGNED_SHORT',
  5125: 'UNSIGNED_INT',
  5126: 'FLOAT',
};

const PRIMITIVE_MODES = {
  0: 'POINTS',
  1: 'LINES',
  2: 'LINE_LOOP',
  3: 'LINE_STRIP',
  4: 'TRIANGLES',
  5: 'TRIANGLE_STRIP',
  6: 'TRIANGLE_FAN',
};

function parseGlb(buffer, sourcePath) {
  if (buffer.length < 20) {
    throw new Error(`${sourcePath}: file is too small to be a GLB`);
  }

  const magic = buffer.readUInt32LE(0);
  const version = buffer.readUInt32LE(4);
  const declaredLength = buffer.readUInt32LE(8);

  if (magic !== GLB_MAGIC) {
    throw new Error(`${sourcePath}: invalid GLB magic 0x${magic.toString(16)}`);
  }
  if (version !== 2) {
    throw new Error(`${sourcePath}: expected GLB 2, received ${version}`);
  }
  if (declaredLength !== buffer.length) {
    throw new Error(`${sourcePath}: header length ${declaredLength} differs from file size ${buffer.length}`);
  }

  let offset = 12;
  let json;
  let binary = Buffer.alloc(0);
  const chunks = [];

  while (offset + 8 <= buffer.length) {
    const chunkLength = buffer.readUInt32LE(offset);
    const chunkType = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    const end = start + chunkLength;
    if (end > buffer.length) {
      throw new Error(`${sourcePath}: chunk at ${offset} exceeds file length`);
    }

    const chunkData = buffer.subarray(start, end);
    chunks.push({ type: `0x${chunkType.toString(16)}`, length: chunkLength });
    if (chunkType === JSON_CHUNK) {
      json = JSON.parse(chunkData.toString('utf8').replace(/[\u0000\u0020]+$/g, ''));
    } else if (chunkType === BIN_CHUNK) {
      binary = chunkData;
    }
    offset = end;
  }

  if (!json) {
    throw new Error(`${sourcePath}: JSON chunk not found`);
  }

  return { json, binary, version, chunks };
}

function identityMatrix() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

function multiplyMatrices(a, b) {
  const out = new Array(16).fill(0);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      for (let index = 0; index < 4; index += 1) {
        out[column * 4 + row] += a[index * 4 + row] * b[column * 4 + index];
      }
    }
  }
  return out;
}

function nodeLocalMatrix(node) {
  if (node.matrix) {
    return [...node.matrix];
  }

  const [x, y, z, w] = node.rotation ?? [0, 0, 0, 1];
  const [sx, sy, sz] = node.scale ?? [1, 1, 1];
  const [tx, ty, tz] = node.translation ?? [0, 0, 0];
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const xy = x * y;
  const xz = x * z;
  const yz = y * z;
  const wx = w * x;
  const wy = w * y;
  const wz = w * z;

  return [
    (1 - 2 * (yy + zz)) * sx,
    (2 * (xy + wz)) * sx,
    (2 * (xz - wy)) * sx,
    0,
    (2 * (xy - wz)) * sy,
    (1 - 2 * (xx + zz)) * sy,
    (2 * (yz + wx)) * sy,
    0,
    (2 * (xz + wy)) * sz,
    (2 * (yz - wx)) * sz,
    (1 - 2 * (xx + yy)) * sz,
    0,
    tx,
    ty,
    tz,
    1,
  ];
}

function transformPoint(matrix, point) {
  const [x, y, z] = point;
  const denominator = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
  const w = denominator || 1;
  return [
    (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w,
    (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w,
    (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w,
  ];
}

function createNodeTransforms(gltf) {
  const nodes = gltf.nodes ?? [];
  const parents = new Array(nodes.length).fill(null);
  nodes.forEach((node, parentIndex) => {
    for (const childIndex of node.children ?? []) {
      parents[childIndex] = parentIndex;
    }
  });

  const local = nodes.map(nodeLocalMatrix);
  const world = new Array(nodes.length);
  const resolveWorld = (index, stack = new Set()) => {
    if (world[index]) return world[index];
    if (stack.has(index)) throw new Error(`Cycle found in node hierarchy at node ${index}`);
    stack.add(index);
    const parentIndex = parents[index];
    world[index] = parentIndex === null
      ? local[index]
      : multiplyMatrices(resolveWorld(parentIndex, stack), local[index]);
    stack.delete(index);
    return world[index];
  };

  nodes.forEach((_, index) => resolveWorld(index));
  return { parents, local, world };
}

function readComponent(buffer, offset, componentType) {
  switch (componentType) {
    case 5120: return buffer.readInt8(offset);
    case 5121: return buffer.readUInt8(offset);
    case 5122: return buffer.readInt16LE(offset);
    case 5123: return buffer.readUInt16LE(offset);
    case 5125: return buffer.readUInt32LE(offset);
    case 5126: return buffer.readFloatLE(offset);
    default: throw new Error(`Unsupported component type ${componentType}`);
  }
}

function normalizeComponent(value, componentType) {
  switch (componentType) {
    case 5120: return Math.max(value / 127, -1);
    case 5121: return value / 255;
    case 5122: return Math.max(value / 32767, -1);
    case 5123: return value / 65535;
    case 5125: return value / 4294967295;
    default: return value;
  }
}

function createAccessorReader(gltf, binary) {
  const accessors = gltf.accessors ?? [];
  const bufferViews = gltf.bufferViews ?? [];
  const cache = new Map();

  function readDenseAccessor(accessorIndex) {
    if (cache.has(accessorIndex)) return cache.get(accessorIndex);
    const accessor = accessors[accessorIndex];
    if (!accessor) throw new Error(`Accessor ${accessorIndex} does not exist`);
    const componentCount = COMPONENTS[accessor.type];
    const componentBytes = COMPONENT_BYTES[accessor.componentType];
    if (!componentCount || !componentBytes) {
      throw new Error(`Accessor ${accessorIndex} uses unsupported type`);
    }

    const values = Array.from({ length: accessor.count }, () => new Array(componentCount).fill(0));
    if (accessor.bufferView !== undefined) {
      const view = bufferViews[accessor.bufferView];
      const elementBytes = componentCount * componentBytes;
      const stride = view.byteStride ?? elementBytes;
      const baseOffset = (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0);
      for (let element = 0; element < accessor.count; element += 1) {
        for (let component = 0; component < componentCount; component += 1) {
          const valueOffset = baseOffset + element * stride + component * componentBytes;
          const raw = readComponent(binary, valueOffset, accessor.componentType);
          values[element][component] = accessor.normalized
            ? normalizeComponent(raw, accessor.componentType)
            : raw;
        }
      }
    }

    if (accessor.sparse) {
      const sparse = accessor.sparse;
      const indexView = bufferViews[sparse.indices.bufferView];
      const indexBytes = COMPONENT_BYTES[sparse.indices.componentType];
      const indexBase = (indexView.byteOffset ?? 0) + (sparse.indices.byteOffset ?? 0);
      const valueView = bufferViews[sparse.values.bufferView];
      const valueBase = (valueView.byteOffset ?? 0) + (sparse.values.byteOffset ?? 0);
      for (let sparseIndex = 0; sparseIndex < sparse.count; sparseIndex += 1) {
        const targetIndex = readComponent(binary, indexBase + sparseIndex * indexBytes, sparse.indices.componentType);
        for (let component = 0; component < componentCount; component += 1) {
          const raw = readComponent(
            binary,
            valueBase + (sparseIndex * componentCount + component) * componentBytes,
            accessor.componentType,
          );
          values[targetIndex][component] = accessor.normalized
            ? normalizeComponent(raw, accessor.componentType)
            : raw;
        }
      }
    }

    cache.set(accessorIndex, values);
    return values;
  }

  return readDenseAccessor;
}

function countTriangles(primitive, gltf) {
  const mode = primitive.mode ?? 4;
  const count = primitive.indices !== undefined
    ? gltf.accessors[primitive.indices].count
    : gltf.accessors[primitive.attributes.POSITION]?.count ?? 0;
  if (mode === 4) return Math.floor(count / 3);
  if (mode === 5 || mode === 6) return Math.max(0, count - 2);
  return 0;
}

function emptyBounds() {
  return {
    min: [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    max: [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  };
}

function expandBounds(bounds, point) {
  for (let axis = 0; axis < 3; axis += 1) {
    bounds.min[axis] = Math.min(bounds.min[axis], point[axis]);
    bounds.max[axis] = Math.max(bounds.max[axis], point[axis]);
  }
}

function finalizeBounds(bounds) {
  if (!Number.isFinite(bounds.min[0])) return null;
  return {
    min: bounds.min,
    max: bounds.max,
    size: bounds.max.map((value, axis) => value - bounds.min[axis]),
    center: bounds.max.map((value, axis) => (value + bounds.min[axis]) / 2),
  };
}

function accessorSummary(accessor, index) {
  return {
    index,
    type: accessor.type,
    componentType: COMPONENT_NAMES[accessor.componentType] ?? accessor.componentType,
    count: accessor.count,
    normalized: Boolean(accessor.normalized),
    min: accessor.min ?? null,
    max: accessor.max ?? null,
  };
}

function formatNodeName(gltf, index) {
  return gltf.nodes?.[index]?.name || `(node ${index})`;
}

function buildSkeletonTree(gltf, jointIndices, parents) {
  const jointSet = new Set(jointIndices);
  const roots = jointIndices.filter(index => !jointSet.has(parents[index]));
  const lines = [];

  function visit(index, prefix, isLast) {
    lines.push(`${prefix}+-- [${index}] ${formatNodeName(gltf, index)}`);
    const children = (gltf.nodes?.[index]?.children ?? []).filter(child => jointSet.has(child));
    children.forEach((child, childIndex) => {
      visit(child, `${prefix}${isLast ? '   ' : '|  '}`, childIndex === children.length - 1);
    });
  }

  roots.forEach((root, rootIndex) => visit(root, '', rootIndex === roots.length - 1));
  return { roots, lines };
}

function analyzeAnimations(gltf, readAccessor, jointSet) {
  return (gltf.animations ?? []).map((animation, animationIndex) => {
    let minTime = Number.POSITIVE_INFINITY;
    let maxTime = Number.NEGATIVE_INFINITY;
    const tracks = (animation.channels ?? []).map((channel, channelIndex) => {
      const sampler = animation.samplers[channel.sampler];
      const input = gltf.accessors[sampler.input];
      const output = gltf.accessors[sampler.output];
      let times = [];
      try {
        times = readAccessor(sampler.input).map(value => value[0]);
      } catch {
        times = [];
      }
      const trackMin = times.length ? Math.min(...times) : input.min?.[0] ?? null;
      const trackMax = times.length ? Math.max(...times) : input.max?.[0] ?? null;
      if (trackMin !== null) minTime = Math.min(minTime, trackMin);
      if (trackMax !== null) maxTime = Math.max(maxTime, trackMax);
      const nodeIndex = channel.target.node;
      return {
        channelIndex,
        targetNodeIndex: nodeIndex ?? null,
        targetNodeName: nodeIndex === undefined ? '(none)' : formatNodeName(gltf, nodeIndex),
        targetPath: channel.target.path,
        isBone: nodeIndex === undefined ? false : jointSet.has(nodeIndex),
        interpolation: sampler.interpolation ?? 'LINEAR',
        keyframes: input.count,
        inputAccessor: accessorSummary(input, sampler.input),
        outputAccessor: accessorSummary(output, sampler.output),
        start: trackMin,
        end: trackMax,
      };
    });

    return {
      index: animationIndex,
      name: animation.name || `(animation ${animationIndex})`,
      start: Number.isFinite(minTime) ? minTime : null,
      end: Number.isFinite(maxTime) ? maxTime : null,
      duration: Number.isFinite(minTime) && Number.isFinite(maxTime) ? maxTime - minTime : null,
      trackCount: tracks.length,
      animatedBones: [...new Set(tracks.filter(track => track.isBone).map(track => track.targetNodeName))],
      animatedNonBones: [...new Set(tracks.filter(track => !track.isBone).map(track => track.targetNodeName))],
      tracks,
    };
  });
}

function analyzeMeshes(gltf) {
  let uniqueTriangles = 0;
  const meshes = (gltf.meshes ?? []).map((mesh, meshIndex) => {
    const primitives = (mesh.primitives ?? []).map((primitive, primitiveIndex) => {
      const triangles = countTriangles(primitive, gltf);
      uniqueTriangles += triangles;
      return {
        index: primitiveIndex,
        mode: PRIMITIVE_MODES[primitive.mode ?? 4] ?? primitive.mode,
        triangles,
        materialIndex: primitive.material ?? null,
        materialName: primitive.material === undefined
          ? null
          : gltf.materials?.[primitive.material]?.name ?? `(material ${primitive.material})`,
        indicesAccessor: primitive.indices ?? null,
        attributes: Object.fromEntries(
          Object.entries(primitive.attributes ?? {}).map(([semantic, accessorIndex]) => [
            semantic,
            accessorSummary(gltf.accessors[accessorIndex], accessorIndex),
          ]),
        ),
        targets: (primitive.targets ?? []).map((target, targetIndex) => ({
          index: targetIndex,
          attributes: Object.keys(target),
        })),
        extensions: primitive.extensions ?? {},
      };
    });
    return {
      index: meshIndex,
      name: mesh.name || `(mesh ${meshIndex})`,
      primitiveCount: primitives.length,
      weights: mesh.weights ?? null,
      primitives,
    };
  });
  return { meshes, uniqueTriangles };
}

function analyzeSceneBounds(gltf, readAccessor, worldMatrices) {
  const bounds = emptyBounds();
  const perNode = [];
  let sceneTriangles = 0;
  const nodes = gltf.nodes ?? [];

  nodes.forEach((node, nodeIndex) => {
    if (node.mesh === undefined) return;
    const mesh = gltf.meshes[node.mesh];
    const nodeBounds = emptyBounds();
    let nodeTriangles = 0;
    for (const primitive of mesh.primitives ?? []) {
      nodeTriangles += countTriangles(primitive, gltf);
      const positionAccessorIndex = primitive.attributes?.POSITION;
      if (positionAccessorIndex === undefined) continue;
      const accessor = gltf.accessors[positionAccessorIndex];
      let positions;
      try {
        positions = readAccessor(positionAccessorIndex);
      } catch {
        positions = null;
      }

      if (positions?.length) {
        for (const position of positions) {
          const point = transformPoint(worldMatrices[nodeIndex], position);
          expandBounds(bounds, point);
          expandBounds(nodeBounds, point);
        }
      } else if (accessor.min && accessor.max) {
        for (const x of [accessor.min[0], accessor.max[0]]) {
          for (const y of [accessor.min[1], accessor.max[1]]) {
            for (const z of [accessor.min[2], accessor.max[2]]) {
              const point = transformPoint(worldMatrices[nodeIndex], [x, y, z]);
              expandBounds(bounds, point);
              expandBounds(nodeBounds, point);
            }
          }
        }
      }
    }
    sceneTriangles += nodeTriangles;
    perNode.push({
      nodeIndex,
      nodeName: formatNodeName(gltf, nodeIndex),
      meshIndex: node.mesh,
      meshName: mesh.name || `(mesh ${node.mesh})`,
      skinIndex: node.skin ?? null,
      triangles: nodeTriangles,
      bounds: finalizeBounds(nodeBounds),
    });
  });

  return { bounds: finalizeBounds(bounds), perNode, sceneTriangles };
}

function analyzeSkins(gltf, transforms) {
  const allJointIndices = new Set();
  const skins = (gltf.skins ?? []).map((skin, skinIndex) => {
    for (const joint of skin.joints ?? []) allJointIndices.add(joint);
    const tree = buildSkeletonTree(gltf, skin.joints ?? [], transforms.parents);
    return {
      index: skinIndex,
      name: skin.name || `(skin ${skinIndex})`,
      jointCount: skin.joints?.length ?? 0,
      skeletonNodeIndex: skin.skeleton ?? null,
      skeletonNodeName: skin.skeleton === undefined ? null : formatNodeName(gltf, skin.skeleton),
      inverseBindMatricesAccessor: skin.inverseBindMatrices ?? null,
      rootJointIndices: tree.roots,
      hierarchy: tree.lines,
      joints: (skin.joints ?? []).map(jointIndex => ({
        index: jointIndex,
        name: formatNodeName(gltf, jointIndex),
        parentIndex: transforms.parents[jointIndex],
        parentName: transforms.parents[jointIndex] === null
          ? null
          : formatNodeName(gltf, transforms.parents[jointIndex]),
        bindWorldPosition: transformPoint(transforms.world[jointIndex], [0, 0, 0]),
      })),
    };
  });
  return { skins, allJointIndices };
}

function analyzeImages(gltf) {
  return (gltf.images ?? []).map((image, index) => ({
    index,
    name: image.name || `(image ${index})`,
    mimeType: image.mimeType ?? null,
    embedded: image.bufferView !== undefined || image.uri?.startsWith('data:'),
    bufferView: image.bufferView ?? null,
    uri: image.uri ? (image.uri.startsWith('data:') ? '(embedded data URI)' : image.uri) : null,
  }));
}

function rootNodeDetails(gltf, transforms) {
  return (gltf.nodes ?? [])
    .map((node, index) => ({ node, index }))
    .filter(({ index }) => transforms.parents[index] === null)
    .map(({ node, index }) => ({
      index,
      name: formatNodeName(gltf, index),
      translation: node.translation ?? [0, 0, 0],
      rotation: node.rotation ?? [0, 0, 0, 1],
      scale: node.scale ?? [1, 1, 1],
      matrix: node.matrix ?? null,
    }));
}

function roundNumber(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return value;
  return Number(value.toFixed(6));
}

function deepRound(value) {
  if (Array.isArray(value)) return value.map(deepRound);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, deepRound(entry)]));
  }
  return roundNumber(value);
}

async function analyzeFile(sourcePath) {
  const absolutePath = path.resolve(sourcePath);
  const buffer = await readFile(absolutePath);
  const parsed = parseGlb(buffer, absolutePath);
  const { json: gltf, binary } = parsed;
  const transforms = createNodeTransforms(gltf);
  const readAccessor = createAccessorReader(gltf, binary);
  const skinAnalysis = analyzeSkins(gltf, transforms);
  const meshAnalysis = analyzeMeshes(gltf);
  const sceneAnalysis = analyzeSceneBounds(gltf, readAccessor, transforms.world);
  const animations = analyzeAnimations(gltf, readAccessor, skinAnalysis.allJointIndices);
  const footBones = [...skinAnalysis.allJointIndices]
    .filter(index => /(foot|toe|ankle)/i.test(formatNodeName(gltf, index)))
    .map(index => ({
      index,
      name: formatNodeName(gltf, index),
      bindWorldPosition: transformPoint(transforms.world[index], [0, 0, 0]),
    }));

  return deepRound({
    sourcePath: absolutePath,
    fileName: path.basename(absolutePath),
    byteLength: buffer.length,
    sha256: createHash('sha256').update(buffer).digest('hex'),
    container: {
      format: 'GLB',
      version: parsed.version,
      chunks: parsed.chunks,
    },
    asset: gltf.asset ?? {},
    defaultScene: gltf.scene ?? 0,
    counts: {
      scenes: gltf.scenes?.length ?? 0,
      nodes: gltf.nodes?.length ?? 0,
      meshes: gltf.meshes?.length ?? 0,
      uniqueMeshTriangles: meshAnalysis.uniqueTriangles,
      instantiatedSceneTriangles: sceneAnalysis.sceneTriangles,
      skins: gltf.skins?.length ?? 0,
      joints: skinAnalysis.allJointIndices.size,
      animations: gltf.animations?.length ?? 0,
      materials: gltf.materials?.length ?? 0,
      textures: gltf.textures?.length ?? 0,
      images: gltf.images?.length ?? 0,
      accessors: gltf.accessors?.length ?? 0,
    },
    coordinateSystem: {
      specificationUpAxis: '+Y (glTF 2.0 convention)',
      handedness: 'right-handed (glTF 2.0 convention)',
      geometryWorldBounds: sceneAnalysis.bounds,
      geometryHeightOnY: sceneAnalysis.bounds?.size[1] ?? null,
      geometryGroundY: sceneAnalysis.bounds?.min[1] ?? null,
      rootNodes: rootNodeDetails(gltf, transforms),
      footBones,
    },
    extensionsUsed: gltf.extensionsUsed ?? [],
    extensionsRequired: gltf.extensionsRequired ?? [],
    meshes: meshAnalysis.meshes,
    meshInstances: sceneAnalysis.perNode,
    skins: skinAnalysis.skins,
    animations,
    materials: (gltf.materials ?? []).map((material, index) => ({
      index,
      name: material.name || `(material ${index})`,
      alphaMode: material.alphaMode ?? 'OPAQUE',
      doubleSided: Boolean(material.doubleSided),
      extensions: material.extensions ?? {},
    })),
    images: analyzeImages(gltf),
    textures: (gltf.textures ?? []).map((texture, index) => ({
      index,
      name: texture.name || `(texture ${index})`,
      source: texture.source ?? null,
      sampler: texture.sampler ?? null,
    })),
    scenes: (gltf.scenes ?? []).map((scene, index) => ({
      index,
      name: scene.name || `(scene ${index})`,
      rootNodes: scene.nodes ?? [],
    })),
    rawMetadata: {
      copyright: gltf.asset?.copyright ?? null,
      generator: gltf.asset?.generator ?? null,
      assetExtras: gltf.asset?.extras ?? null,
      documentExtras: gltf.extras ?? null,
      documentExtensions: gltf.extensions ?? null,
    },
  });
}

function formatVector(vector) {
  return vector ? `[${vector.map(value => roundNumber(value)).join(', ')}]` : 'n/a';
}

function renderMarkdown(reports) {
  const lines = [
    '# GLB VERIFICATION REPORT',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '> This report is generated directly from the original GLB containers. No model file is modified.',
    '> Geometry bounds use POSITION and node transforms, without skin deformation. Runtime skinned bounds must be measured separately before normalization.',
    '',
    '## Summary',
    '',
    '| File | Bytes | SHA-256 | Meshes | Triangles (unique) | Skins | Joints | Animations | Images | Height Y | Ground Y |',
    '|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|',
  ];

  for (const report of reports) {
    lines.push(`| ${report.fileName} | ${report.byteLength} | \`${report.sha256}\` | ${report.counts.meshes} | ${report.counts.uniqueMeshTriangles} | ${report.counts.skins} | ${report.counts.joints} | ${report.counts.animations} | ${report.counts.images} | ${roundNumber(report.coordinateSystem.geometryHeightOnY)} | ${roundNumber(report.coordinateSystem.geometryGroundY)} |`);
  }

  for (const report of reports) {
    lines.push('', `## ${report.fileName}`, '');
    lines.push(`- Source: \`${report.sourcePath}\``);
    lines.push(`- GLB: version ${report.container.version}, ${report.byteLength} bytes`);
    lines.push(`- SHA-256: \`${report.sha256}\``);
    lines.push(`- Asset metadata: \`${JSON.stringify(report.asset)}\``);
    lines.push(`- Extensions used: ${report.extensionsUsed.length ? report.extensionsUsed.join(', ') : 'none'}`);
    lines.push(`- Counts: ${report.counts.meshes} meshes, ${report.counts.uniqueMeshTriangles} unique triangles, ${report.counts.instantiatedSceneTriangles} instantiated triangles, ${report.counts.skins} skin, ${report.counts.joints} joints, ${report.counts.materials} materials, ${report.counts.images} images.`);
    lines.push(`- Coordinate convention: ${report.coordinateSystem.specificationUpAxis}, ${report.coordinateSystem.handedness}.`);
    const bounds = report.coordinateSystem.geometryWorldBounds;
    lines.push(`- World geometry bounds: min ${formatVector(bounds?.min)}, max ${formatVector(bounds?.max)}, size ${formatVector(bounds?.size)}, center ${formatVector(bounds?.center)}.`);
    lines.push(`- Height on Y: ${roundNumber(report.coordinateSystem.geometryHeightOnY)}; geometric ground/min Y: ${roundNumber(report.coordinateSystem.geometryGroundY)}.`);

    lines.push('', '### Root transforms', '');
    for (const root of report.coordinateSystem.rootNodes) {
      lines.push(`- [${root.index}] ${root.name}: translation ${formatVector(root.translation)}, rotation ${formatVector(root.rotation)}, scale ${formatVector(root.scale)}${root.matrix ? `, matrix ${formatVector(root.matrix)}` : ''}`);
    }

    lines.push('', '### Meshes and primitives', '');
    for (const mesh of report.meshes) {
      lines.push(`- [${mesh.index}] ${mesh.name}: ${mesh.primitiveCount} primitive(s)`);
      for (const primitive of mesh.primitives) {
        const position = primitive.attributes.POSITION;
        lines.push(`  - Primitive ${primitive.index}: ${primitive.mode}, ${primitive.triangles} triangles, material ${primitive.materialName ?? 'none'}, POSITION accessor ${position ? `${position.index} (${position.count} vertices)` : 'none'}`);
      }
    }

    lines.push('', '### Mesh instances and bounds', '');
    for (const instance of report.meshInstances) {
      lines.push(`- Node [${instance.nodeIndex}] ${instance.nodeName} -> mesh [${instance.meshIndex}] ${instance.meshName}, skin ${instance.skinIndex ?? 'none'}, ${instance.triangles} triangles, bounds min ${formatVector(instance.bounds?.min)} max ${formatVector(instance.bounds?.max)}`);
    }

    lines.push('', '### Skins and skeleton hierarchy', '');
    if (!report.skins.length) lines.push('- No skins.');
    for (const skin of report.skins) {
      lines.push(`#### Skin [${skin.index}] ${skin.name}`);
      lines.push('', `Joints: ${skin.jointCount}; skeleton root: ${skin.skeletonNodeName ?? 'not explicitly declared'}; inverse bind accessor: ${skin.inverseBindMatricesAccessor ?? 'none'}.`, '');
      lines.push('```text', ...skin.hierarchy, '```', '');
      lines.push('| Index | Bone | Parent | Bind world position |', '|---:|---|---|---|');
      for (const joint of skin.joints) {
        lines.push(`| ${joint.index} | ${joint.name} | ${joint.parentName ?? 'none'} | ${formatVector(joint.bindWorldPosition)} |`);
      }
    }

    lines.push('', '### Feet and ground references', '');
    lines.push(`- Geometry min Y: ${roundNumber(report.coordinateSystem.geometryGroundY)}.`);
    if (report.coordinateSystem.footBones.length) {
      for (const foot of report.coordinateSystem.footBones) {
        lines.push(`- Bone [${foot.index}] ${foot.name}: bind world position ${formatVector(foot.bindWorldPosition)}.`);
      }
    } else {
      lines.push('- No joint name matched foot/toe/ankle; geometric min Y must be used as the initial ground reference.');
    }

    lines.push('', '### Animations and tracks', '');
    if (!report.animations.length) lines.push('- No animations.');
    for (const animation of report.animations) {
      lines.push(`#### [${animation.index}] ${animation.name}`);
      lines.push('', `Duration: ${roundNumber(animation.duration)} s (${roundNumber(animation.start)} to ${roundNumber(animation.end)}); ${animation.trackCount} tracks.`, '');
      lines.push(`Animated bones (${animation.animatedBones.length}): ${animation.animatedBones.join(', ') || 'none'}.`);
      if (animation.animatedNonBones.length) lines.push(`Animated non-bone nodes: ${animation.animatedNonBones.join(', ')}.`);
      lines.push('', '| # | Target | Bone | Path | Interpolation | Keys | Start | End |', '|---:|---|:---:|---|---|---:|---:|---:|');
      for (const track of animation.tracks) {
        lines.push(`| ${track.channelIndex} | ${track.targetNodeName} | ${track.isBone ? 'yes' : 'no'} | ${track.targetPath} | ${track.interpolation} | ${track.keyframes} | ${roundNumber(track.start)} | ${roundNumber(track.end)} |`);
      }
    }

    lines.push('', '### Images and materials', '');
    lines.push(`- Images: ${report.images.length}; textures: ${report.counts.textures}; materials: ${report.materials.length}.`);
    for (const image of report.images) {
      lines.push(`- Image [${image.index}] ${image.name}: ${image.mimeType ?? 'unknown MIME'}, ${image.embedded ? 'embedded' : `external (${image.uri})`}.`);
    }
    for (const material of report.materials) {
      lines.push(`- Material [${material.index}] ${material.name}: ${material.alphaMode}, double-sided=${material.doubleSided}.`);
    }

    lines.push('', '### License/source metadata found in the GLB', '');
    lines.push('```json', JSON.stringify(report.rawMetadata, null, 2), '```');
  }

  return `${lines.join('\n')}\n`;
}

async function main() {
  const args = process.argv.slice(2);
  const outputFlag = args.indexOf('--output');
  let outputName = 'current-glb-analysis';
  if (outputFlag !== -1) {
    outputName = args[outputFlag + 1];
    if (!outputName || !/^[a-zA-Z0-9_-]+$/.test(outputName)) {
      throw new Error('--output requires a report basename (letters, digits, hyphens or underscores).');
    }
    args.splice(outputFlag, 2);
  }
  const sources = args.length
    ? args
    : ['cristiano_ronaldo.glb', 'messi_2023_3d_free.glb'];
  const reports = [];
  for (const source of sources) {
    reports.push(await analyzeFile(source));
  }

  const outputDirectory = path.resolve('reports');
  await mkdir(outputDirectory, { recursive: true });
  const jsonPath = path.join(outputDirectory, `${outputName}.json`);
  const markdownPath = path.join(outputDirectory, `${outputName}.md`);
  await writeFile(jsonPath, `${JSON.stringify(reports, null, 2)}\n`, 'utf8');
  await writeFile(markdownPath, renderMarkdown(reports), 'utf8');

  for (const report of reports) {
    console.log(`${report.fileName}: ${report.counts.uniqueMeshTriangles} triangles, ${report.counts.joints} joints, ${report.counts.animations} animations, heightY=${report.coordinateSystem.geometryHeightOnY}, minY=${report.coordinateSystem.geometryGroundY}, sha256=${report.sha256}`);
    for (const animation of report.animations) {
      console.log(`  animation ${animation.name}: ${animation.duration}s, ${animation.trackCount} tracks`);
    }
  }
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${markdownPath}`);
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

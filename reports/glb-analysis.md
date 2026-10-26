# GLB VERIFICATION REPORT

Generated: 2026-10-20T20:23:52.137Z

> This report is generated directly from the original GLB containers. No model file is modified.

## Summary

| File | Bytes | SHA-256 | Meshes | Triangles (unique) | Skins | Joints | Animations | Images | Height Y | Ground Y |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| ronaldo_rigged.glb | 3256648 | `f1c0daf2165a7c993eeb77ea31c69318cf5777a7b13fd8de8ae7f2975d0f1327` | 1 | 17392 | 1 | 17 | 6 | 6 | 3.371 | 0.028 |
| messi_2023_3d_free.glb | 10881188 | `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7` | 10 | 29554 | 1 | 34 | 1 | 8 | 0.963145 | -0.484724 |

## ronaldo_rigged.glb

- Source: `C:\3d\ronaldo_rigged.glb`
- GLB: version 2, 3256648 bytes
- SHA-256: `f1c0daf2165a7c993eeb77ea31c69318cf5777a7b13fd8de8ae7f2975d0f1327`
- Asset metadata: `{"version":"2.0","generator":"Python rigged GLB - custom procedural authoring"}`
- Extensions used: none
- Counts: 1 meshes, 17392 unique triangles, 17392 instantiated triangles, 1 skin, 17 joints, 12 materials, 6 images.
- Coordinate convention: +Y (glTF 2.0 convention), right-handed (glTF 2.0 convention).
- World geometry bounds: min [-0.697003, 0.028, -0.26], max [0.697003, 3.399, 0.46], size [1.394005, 3.371, 0.72], center [0, 1.7135, 0.1].
- Height on Y: 3.371; geometric ground/min Y: 0.028.

### Root transforms

- [0] Hips: translation [0, 1.35, 0], rotation [0, 0, 0, 1], scale [1, 1, 1]
- [17] RiggedCharacterMesh: translation [0, 0, 0], rotation [0, 0, 0, 1], scale [1, 1, 1]

### Meshes and primitives

- [0] RealSkinnedCharacterMesh: 12 primitive(s)
  - Primitive 0: TRIANGLES, 1608 triangles, material shirt, POSITION accessor 0 (946 vertices)
  - Primitive 1: TRIANGLES, 216 triangles, material trim, POSITION accessor 6 (222 vertices)
  - Primitive 2: TRIANGLES, 812 triangles, material shorts, POSITION accessor 12 (598 vertices)
  - Primitive 3: TRIANGLES, 4256 triangles, material skin, POSITION accessor 18 (2568 vertices)
  - Primitive 4: TRIANGLES, 4032 triangles, material face, POSITION accessor 24 (2109 vertices)
  - Primitive 5: TRIANGLES, 5072 triangles, material hair, POSITION accessor 30 (2966 vertices)
  - Primitive 6: TRIANGLES, 320 triangles, material headset, POSITION accessor 36 (187 vertices)
  - Primitive 7: TRIANGLES, 124 triangles, material shorts_trim, POSITION accessor 42 (132 vertices)
  - Primitive 8: TRIANGLES, 672 triangles, material shoes, POSITION accessor 48 (456 vertices)
  - Primitive 9: TRIANGLES, 256 triangles, material sole, POSITION accessor 54 (198 vertices)
  - Primitive 10: TRIANGLES, 20 triangles, material laces, POSITION accessor 60 (40 vertices)
  - Primitive 11: TRIANGLES, 4 triangles, material red, POSITION accessor 66 (8 vertices)

### Mesh instances and bounds

- Node [17] RiggedCharacterMesh -> mesh [0] RealSkinnedCharacterMesh, skin 0, 17392 triangles, bounds min [-0.697003, 0.028, -0.26] max [0.697003, 3.399, 0.46]

### Skins and skeleton hierarchy

#### Skin [0] HumanoidRig

Joints: 17; skeleton root: Hips; inverse bind accessor: 72.

```text
+-- [0] Hips
   +-- [1] Spine
   |  +-- [2] Chest
   |     +-- [3] Neck
   |     |  +-- [4] Head
   |     +-- [5] LeftUpperArm
   |     |  +-- [6] LeftForearm
   |     |     +-- [7] LeftHand
   |     +-- [8] RightUpperArm
   |        +-- [9] RightForearm
   |           +-- [10] RightHand
   +-- [11] LeftUpperLeg
   |  +-- [12] LeftLowerLeg
   |     +-- [13] LeftFoot
   +-- [14] RightUpperLeg
      +-- [15] RightLowerLeg
         +-- [16] RightFoot
```

| Index | Bone | Parent | Bind world position |
|---:|---|---|---|
| 0 | Hips | none | [0, 1.35, 0] |
| 1 | Spine | Hips | [0, 1.6, 0] |
| 2 | Chest | Spine | [0, 2.22, 0] |
| 3 | Neck | Chest | [0, 2.51, 0] |
| 4 | Head | Neck | [0, 2.73, 0] |
| 5 | LeftUpperArm | Chest | [-0.48, 2.32, 0] |
| 6 | LeftForearm | LeftUpperArm | [-0.545, 1.89, 0] |
| 7 | LeftHand | LeftForearm | [-0.59, 1.49, 0] |
| 8 | RightUpperArm | Chest | [0.48, 2.32, 0] |
| 9 | RightForearm | RightUpperArm | [0.545, 1.89, 0] |
| 10 | RightHand | RightForearm | [0.59, 1.49, 0] |
| 11 | LeftUpperLeg | Hips | [-0.225, 1.28, 0] |
| 12 | LeftLowerLeg | LeftUpperLeg | [-0.225, 0.64, 0] |
| 13 | LeftFoot | LeftLowerLeg | [-0.225, 0.16, 0.04] |
| 14 | RightUpperLeg | Hips | [0.225, 1.28, 0] |
| 15 | RightLowerLeg | RightUpperLeg | [0.225, 0.64, 0] |
| 16 | RightFoot | RightLowerLeg | [0.225, 0.16, 0.04] |

### Feet and ground references

- Geometry min Y: 0.028.
- Bone [13] LeftFoot: bind world position [-0.225, 0.16, 0.04].
- Bone [16] RightFoot: bind world position [0.225, 0.16, 0.04].

### Animations and tracks

#### [0] Idle

Duration: 3 s (0 to 3); 4 tracks.

Animated bones (4): Hips, Chest, LeftUpperArm, RightUpperArm.

| # | Target | Bone | Path | Interpolation | Keys | Start | End |
|---:|---|:---:|---|---|---:|---:|---:|
| 0 | Hips | yes | translation | LINEAR | 3 | 0 | 3 |
| 1 | Chest | yes | rotation | LINEAR | 3 | 0 | 3 |
| 2 | LeftUpperArm | yes | rotation | LINEAR | 3 | 0 | 3 |
| 3 | RightUpperArm | yes | rotation | LINEAR | 3 | 0 | 3 |
#### [1] SIUUU

Duration: 4.5 s (0 to 4.5); 9 tracks.

Animated bones (8): Hips, LeftUpperArm, RightUpperArm, LeftUpperLeg, RightUpperLeg, LeftLowerLeg, RightLowerLeg, Chest.

| # | Target | Bone | Path | Interpolation | Keys | Start | End |
|---:|---|:---:|---|---|---:|---:|---:|
| 0 | Hips | yes | translation | LINEAR | 9 | 0 | 4.5 |
| 1 | Hips | yes | rotation | LINEAR | 8 | 0 | 4.5 |
| 2 | LeftUpperArm | yes | rotation | LINEAR | 7 | 0 | 4.5 |
| 3 | RightUpperArm | yes | rotation | LINEAR | 7 | 0 | 4.5 |
| 4 | LeftUpperLeg | yes | rotation | LINEAR | 5 | 0 | 4.5 |
| 5 | RightUpperLeg | yes | rotation | LINEAR | 5 | 0 | 4.5 |
| 6 | LeftLowerLeg | yes | rotation | LINEAR | 5 | 0 | 4.5 |
| 7 | RightLowerLeg | yes | rotation | LINEAR | 5 | 0 | 4.5 |
| 8 | Chest | yes | rotation | LINEAR | 3 | 0 | 4.5 |
#### [2] Calma

Duration: 3 s (0 to 3); 5 tracks.

Animated bones (5): LeftUpperArm, RightUpperArm, LeftForearm, RightForearm, Chest.

| # | Target | Bone | Path | Interpolation | Keys | Start | End |
|---:|---|:---:|---|---|---:|---:|---:|
| 0 | LeftUpperArm | yes | rotation | LINEAR | 7 | 0 | 3 |
| 1 | RightUpperArm | yes | rotation | LINEAR | 7 | 0 | 3 |
| 2 | LeftForearm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 3 | RightForearm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 4 | Chest | yes | rotation | LINEAR | 3 | 0 | 3 |
#### [3] Sleep

Duration: 3 s (0 to 3); 6 tracks.

Animated bones (6): Chest, Head, LeftUpperArm, RightUpperArm, LeftForearm, RightForearm.

| # | Target | Bone | Path | Interpolation | Keys | Start | End |
|---:|---|:---:|---|---|---:|---:|---:|
| 0 | Chest | yes | rotation | LINEAR | 4 | 0 | 3 |
| 1 | Head | yes | rotation | LINEAR | 4 | 0 | 3 |
| 2 | LeftUpperArm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 3 | RightUpperArm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 4 | LeftForearm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 5 | RightForearm | yes | rotation | LINEAR | 4 | 0 | 3 |
#### [4] Power Pose

Duration: 3 s (0 to 3); 5 tracks.

Animated bones (5): LeftUpperArm, RightUpperArm, LeftForearm, RightForearm, Chest.

| # | Target | Bone | Path | Interpolation | Keys | Start | End |
|---:|---|:---:|---|---|---:|---:|---:|
| 0 | LeftUpperArm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 1 | RightUpperArm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 2 | LeftForearm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 3 | RightForearm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 4 | Chest | yes | rotation | LINEAR | 3 | 0 | 3 |
#### [5] Point Up

Duration: 3 s (0 to 3); 4 tracks.

Animated bones (4): LeftUpperArm, RightUpperArm, Head, Chest.

| # | Target | Bone | Path | Interpolation | Keys | Start | End |
|---:|---|:---:|---|---|---:|---:|---:|
| 0 | LeftUpperArm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 1 | RightUpperArm | yes | rotation | LINEAR | 4 | 0 | 3 |
| 2 | Head | yes | rotation | LINEAR | 4 | 0 | 3 |
| 3 | Chest | yes | rotation | LINEAR | 4 | 0 | 3 |

### Images and materials

- Images: 6; textures: 6; materials: 12.
- Image [0] (image 0): image/png, embedded.
- Image [1] (image 1): image/png, embedded.
- Image [2] (image 2): image/png, embedded.
- Image [3] (image 3): image/png, embedded.
- Image [4] (image 4): image/png, embedded.
- Image [5] (image 5): image/png, embedded.
- Material [0] skin: OPAQUE, double-sided=true.
- Material [1] face: OPAQUE, double-sided=true.
- Material [2] hair: OPAQUE, double-sided=true.
- Material [3] shirt: OPAQUE, double-sided=true.
- Material [4] shorts: OPAQUE, double-sided=true.
- Material [5] shoes: OPAQUE, double-sided=true.
- Material [6] trim: OPAQUE, double-sided=true.
- Material [7] shorts_trim: OPAQUE, double-sided=true.
- Material [8] headset: OPAQUE, double-sided=true.
- Material [9] sole: OPAQUE, double-sided=true.
- Material [10] red: OPAQUE, double-sided=true.
- Material [11] laces: OPAQUE, double-sided=true.

### License/source metadata found in the GLB

```json
{
  "copyright": null,
  "generator": "Python rigged GLB - custom procedural authoring",
  "assetExtras": null,
  "documentExtras": null,
  "documentExtensions": null
}
```

## messi_2023_3d_free.glb

- Source: `C:\3d\messi_2023_3d_free.glb`
- GLB: version 2, 10881188 bytes
- SHA-256: `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`
- Asset metadata: `{"extras":{"author":"Ltti....................Ttg (https://sketchfab.com/Ltti....................Ttg)","license":"CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)","source":"https://sketchfab.com/3d-models/messi-2023-3d-free-38fb7c1839064abd9e0a1b7e1e7d68a9","title":"messi 2023 3d free"},"generator":"Sketchfab-15.18.0","version":"2.0"}`
- Extensions used: none
- Counts: 10 meshes, 29554 unique triangles, 29554 instantiated triangles, 1 skin, 34 joints, 10 materials, 8 images.
- Coordinate convention: +Y (glTF 2.0 convention), right-handed (glTF 2.0 convention).
- World geometry bounds: min [-0.693483, -0.484724, -0.157187], max [0.586148, 0.478421, 0.091944], size [1.279631, 0.963145, 0.249132], center [-0.053667, -0.003151, -0.032622].
- Height on Y: 0.963145; geometric ground/min Y: -0.484724.

### Root transforms

- [0] Sketchfab_model: translation [0, 0, 0], rotation [0, 0, 0, 1], scale [1, 1, 1], matrix [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1]

### Meshes and primitives

- [0] k_unnamed_0_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 9800 triangles, material unnamed_0, POSITION accessor 0 (5511 vertices)
- [1] k_Material__37_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 2808 triangles, material Material__37, POSITION accessor 4 (1514 vertices)
- [2] k_Material__50_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 9426 triangles, material Material__50, POSITION accessor 8 (5249 vertices)
- [3] k_Material__89_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 4640 triangles, material Material__89, POSITION accessor 12 (2448 vertices)
- [4] k_Material__115_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 528 triangles, material Material__115, POSITION accessor 16 (314 vertices)
- [5] k_Material__76_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 734 triangles, material Material__76, POSITION accessor 20 (385 vertices)
- [6] k_Material__63_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 1552 triangles, material Material__63, POSITION accessor 24 (1094 vertices)
- [7] k_Material__139_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 24 triangles, material Material__139, POSITION accessor 28 (26 vertices)
- [8] k_Material__152_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 24 triangles, material Material__152, POSITION accessor 32 (26 vertices)
- [9] k_Material__127_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 18 triangles, material Material__127, POSITION accessor 36 (20 vertices)

### Mesh instances and bounds

- Node [7] Object_7 -> mesh [0] k_unnamed_0_0, skin 0, 9800 triangles, bounds min [-0.693483, -0.252054, -0.111797] max [0.425688, 0.247765, 0.091944]
- Node [8] Object_8 -> mesh [1] k_Material__37_0, skin 0, 2808 triangles, bounds min [-0.345116, -0.148099, -0.089604] max [-0.091829, 0.147151, 0.045475]
- Node [9] Object_9 -> mesh [2] k_Material__50_0, skin 0, 9426 triangles, bounds min [-0.03447, -0.484724, -0.06561] max [0.300128, 0.478421, 0.038002]
- Node [10] Object_10 -> mesh [3] k_Material__89_0, skin 0, 4640 triangles, bounds min [0.28743, -0.071371, -0.107131] max [0.586148, 0.067994, 0.048997]
- Node [11] Object_11 -> mesh [4] k_Material__115_0, skin 0, 528 triangles, bounds min [0.451368, -0.02412, -0.090789] max [0.477777, 0.024027, -0.052454]
- Node [12] Object_12 -> mesh [5] k_Material__76_0, skin 0, 734 triangles, bounds min [0.500168, -0.026926, -0.077297] max [0.519685, 0.029492, -0.063682]
- Node [13] Object_13 -> mesh [6] k_Material__63_0, skin 0, 1552 triangles, bounds min [-0.691639, -0.182562, -0.157187] max [-0.596715, 0.180808, 0.044538]
- Node [14] Object_14 -> mesh [7] k_Material__139_0, skin 0, 24 triangles, bounds min [0.292863, -0.007427, -0.096427] max [0.414734, 0.082063, 0.06248]
- Node [15] Object_15 -> mesh [8] k_Material__152_0, skin 0, 24 triangles, bounds min [0.292863, -0.082059, -0.096427] max [0.414735, 0.00743, 0.06248]
- Node [16] Object_16 -> mesh [9] k_Material__127_0, skin 0, 18 triangles, bounds min [0.25493, -0.019791, -0.109851] max [0.293453, 0.020087, -0.099542]

### Skins and skeleton hierarchy

#### Skin [0] (skin 0)

Joints: 34; skeleton root: _rootJoint; inverse bind accessor: 40.

```text
+-- [5] _rootJoint
   +-- [17] mixamorig:Hips_00
      +-- [18] mixamorig:Spine_01
      |  +-- [19] mixamorig:Spine1_012
      |     +-- [20] mixamorig:Spine2_013
      |        +-- [21] mixamorig:Neck_014
      |        |  +-- [22] mixamorig:Head_015
      |        |     +-- [23] mixamorig:HeadTop_End_016
      |        +-- [24] mixamorig:LeftShoulder_017
      |        |  +-- [25] mixamorig:LeftArm_018
      |        |     +-- [26] mixamorig:LeftForeArm_019
      |        |        +-- [27] mixamorig:LeftHand_020
      |        |           +-- [28] mixamorig:LeftHandIndex1_021
      |        |              +-- [29] mixamorig:LeftHandIndex2_023
      |        |                 +-- [30] mixamorig:LeftHandIndex3_024
      |        |                    +-- [31] mixamorig:LeftHandIndex4_025
      |        +-- [32] mixamorig:RightShoulder_026
      |           +-- [33] mixamorig:RightArm_027
      |              +-- [34] mixamorig:RightForeArm_028
      |                 +-- [35] mixamorig:RightHand_029
      |                    +-- [36] mixamorig:RightHandIndex1_030
      |                       +-- [37] mixamorig:RightHandIndex2_031
      |                          +-- [38] mixamorig:RightHandIndex3_032
      |                             +-- [39] mixamorig:RightHandIndex4_02
      +-- [40] mixamorig:LeftUpLeg_03
      |  +-- [41] mixamorig:LeftLeg_04
      |     +-- [42] mixamorig:LeftFoot_05
      |        +-- [43] mixamorig:LeftToeBase_06
      |           +-- [44] mixamorig:LeftToe_End_07
      +-- [45] mixamorig:RightUpLeg_022
         +-- [46] mixamorig:RightLeg_08
            +-- [47] mixamorig:RightFoot_09
               +-- [48] mixamorig:RightToeBase_010
                  +-- [49] mixamorig:RightToe_End_011
```

| Index | Bone | Parent | Bind world position |
|---:|---|---|---|
| 5 | _rootJoint | Object_4 | [0, 0, 0] |
| 17 | mixamorig:Hips_00 | _rootJoint | [0.794348, -0.183958, -2.258427] |
| 18 | mixamorig:Spine_01 | mixamorig:Hips_00 | [0.794348, 7.245826, -2.827681] |
| 19 | mixamorig:Spine1_012 | mixamorig:Spine_01 | [0.794348, 15.913905, -3.49181] |
| 20 | mixamorig:Spine2_013 | mixamorig:Spine1_012 | [0.794348, 25.820287, -4.250815] |
| 21 | mixamorig:Neck_014 | mixamorig:Spine2_013 | [0.794348, 36.964959, -5.104695] |
| 22 | mixamorig:Head_015 | mixamorig:Neck_014 | [0.794348, 43.496576, -3.370283] |
| 23 | mixamorig:HeadTop_End_016 | mixamorig:Head_015 | [0.794348, 57.301751, 0.29556] |
| 24 | mixamorig:LeftShoulder_017 | mixamorig:Spine2_013 | [5.131178, 35.1969, -5.071209] |
| 25 | mixamorig:LeftArm_018 | mixamorig:LeftShoulder_017 | [13.929678, 31.730675, -5.004236] |
| 26 | mixamorig:LeftForeArm_019 | mixamorig:LeftArm_018 | [28.27643, 19.043302, -5.365375] |
| 27 | mixamorig:LeftHand_020 | mixamorig:LeftForeArm_019 | [42.573235, 6.150299, -2.375442] |
| 28 | mixamorig:LeftHandIndex1_021 | mixamorig:LeftHand_020 | [47.862263, -0.072411, 0.228768] |
| 29 | mixamorig:LeftHandIndex2_023 | mixamorig:LeftHandIndex1_021 | [47.907839, -1.342703, 0.48877] |
| 30 | mixamorig:LeftHandIndex3_024 | mixamorig:LeftHandIndex2_023 | [46.559299, -2.822223, 0.533574] |
| 31 | mixamorig:LeftHandIndex4_025 | mixamorig:LeftHandIndex3_024 | [45.976213, -4.382376, 0.487875] |
| 32 | mixamorig:RightShoulder_026 | mixamorig:Spine2_013 | [-3.542482, 35.1969, -5.138182] |
| 33 | mixamorig:RightArm_027 | mixamorig:RightShoulder_026 | [-12.340983, 31.730672, -5.205154] |
| 34 | mixamorig:RightForeArm_028 | mixamorig:RightArm_027 | [-26.687739, 19.043292, -5.211324] |
| 35 | mixamorig:RightHand_029 | mixamorig:RightForeArm_028 | [-40.984556, 6.150281, -2.393808] |
| 36 | mixamorig:RightHandIndex1_030 | mixamorig:RightHand_029 | [-44.642066, -1.481417, -2.367897] |
| 37 | mixamorig:RightHandIndex2_031 | mixamorig:RightHandIndex1_030 | [-43.629459, -2.220811, -1.810333] |
| 38 | mixamorig:RightHandIndex3_032 | mixamorig:RightHandIndex2_031 | [-43.132955, -2.069472, -2.696369] |
| 39 | mixamorig:RightHandIndex4_02 | mixamorig:RightHandIndex3_032 | [-42.468364, -2.455048, -3.070006] |
| 40 | mixamorig:LeftUpLeg_03 | mixamorig:Hips_00 | [6.991992, -4.314604, -2.50834] |
| 41 | mixamorig:LeftLeg_04 | mixamorig:LeftUpLeg_03 | [11.728765, -33.625995, -3.138342] |
| 42 | mixamorig:LeftFoot_05 | mixamorig:LeftLeg_04 | [14.906117, -62.453983, -3.506858] |
| 43 | mixamorig:LeftToeBase_06 | mixamorig:LeftFoot_05 | [15.351072, -68.485268, 6.12336] |
| 44 | mixamorig:LeftToe_End_07 | mixamorig:LeftToeBase_06 | [15.515366, -68.197808, 10.785975] |
| 45 | mixamorig:RightUpLeg_022 | mixamorig:Hips_00 | [-5.403295, -4.314604, -2.343736] |
| 46 | mixamorig:RightLeg_08 | mixamorig:RightUpLeg_022 | [-10.140068, -33.626009, -3.140552] |
| 47 | mixamorig:RightFoot_09 | mixamorig:RightLeg_08 | [-13.317397, -62.45404, -3.501681] |
| 48 | mixamorig:RightToeBase_010 | mixamorig:RightFoot_09 | [-13.762236, -68.484625, 6.031429] |
| 49 | mixamorig:RightToe_End_011 | mixamorig:RightToeBase_010 | [-13.926474, -68.196816, 10.692774] |

### Feet and ground references

- Geometry min Y: -0.484724.
- Bone [42] mixamorig:LeftFoot_05: bind world position [14.906117, -62.453983, -3.506858].
- Bone [43] mixamorig:LeftToeBase_06: bind world position [15.351072, -68.485268, 6.12336].
- Bone [44] mixamorig:LeftToe_End_07: bind world position [15.515366, -68.197808, 10.785975].
- Bone [47] mixamorig:RightFoot_09: bind world position [-13.317397, -62.45404, -3.501681].
- Bone [48] mixamorig:RightToeBase_010: bind world position [-13.762236, -68.484625, 6.031429].
- Bone [49] mixamorig:RightToe_End_011: bind world position [-13.926474, -68.196816, 10.692774].

### Animations and tracks

#### [0] mixamo.com

Duration: 1.066667 s (0 to 1.066667); 50 tracks.

Animated bones (28): mixamorig:Head_015, mixamorig:Neck_014, mixamorig:LeftHandIndex3_024, mixamorig:LeftHandIndex2_023, mixamorig:LeftHandIndex1_021, mixamorig:LeftHand_020, mixamorig:LeftForeArm_019, mixamorig:LeftArm_018, mixamorig:LeftShoulder_017, mixamorig:RightHandIndex3_032, mixamorig:RightHandIndex2_031, mixamorig:RightHandIndex1_030, mixamorig:RightHand_029, mixamorig:RightForeArm_028, mixamorig:RightArm_027, mixamorig:RightShoulder_026, mixamorig:Spine2_013, mixamorig:Spine1_012, mixamorig:Spine_01, mixamorig:LeftToeBase_06, mixamorig:LeftFoot_05, mixamorig:LeftLeg_04, mixamorig:LeftUpLeg_03, mixamorig:RightToeBase_010, mixamorig:RightFoot_09, mixamorig:RightLeg_08, mixamorig:RightUpLeg_022, mixamorig:Hips_00.

| # | Target | Bone | Path | Interpolation | Keys | Start | End |
|---:|---|:---:|---|---|---:|---:|---:|
| 0 | mixamorig:Head_015 | yes | translation | LINEAR | 31 | 0 | 1.066667 |
| 1 | mixamorig:Head_015 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 2 | mixamorig:Neck_014 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 3 | mixamorig:Neck_014 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 4 | mixamorig:LeftHandIndex3_024 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 5 | mixamorig:LeftHandIndex2_023 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 6 | mixamorig:LeftHandIndex2_023 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 7 | mixamorig:LeftHandIndex1_021 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 8 | mixamorig:LeftHandIndex1_021 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 9 | mixamorig:LeftHand_020 | yes | translation | LINEAR | 25 | 0 | 1.066667 |
| 10 | mixamorig:LeftHand_020 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 11 | mixamorig:LeftForeArm_019 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 12 | mixamorig:LeftForeArm_019 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 13 | mixamorig:LeftArm_018 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 14 | mixamorig:LeftArm_018 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 15 | mixamorig:LeftShoulder_017 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 16 | mixamorig:RightHandIndex3_032 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 17 | mixamorig:RightHandIndex2_031 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 18 | mixamorig:RightHandIndex2_031 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 19 | mixamorig:RightHandIndex1_030 | yes | translation | LINEAR | 32 | 0 | 1.066667 |
| 20 | mixamorig:RightHandIndex1_030 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 21 | mixamorig:RightHand_029 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 22 | mixamorig:RightHand_029 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 23 | mixamorig:RightForeArm_028 | yes | translation | LINEAR | 31 | 0 | 1.066667 |
| 24 | mixamorig:RightForeArm_028 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 25 | mixamorig:RightArm_027 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 26 | mixamorig:RightArm_027 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 27 | mixamorig:RightShoulder_026 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 28 | mixamorig:Spine2_013 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 29 | mixamorig:Spine2_013 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 30 | mixamorig:Spine1_012 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 31 | mixamorig:Spine1_012 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 32 | mixamorig:Spine_01 | yes | translation | LINEAR | 32 | 0 | 1.066667 |
| 33 | mixamorig:Spine_01 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 34 | mixamorig:LeftToeBase_06 | yes | translation | LINEAR | 27 | 0 | 1.066667 |
| 35 | mixamorig:LeftToeBase_06 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 36 | mixamorig:LeftFoot_05 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 37 | mixamorig:LeftFoot_05 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 38 | mixamorig:LeftLeg_04 | yes | translation | LINEAR | 30 | 0 | 1.066667 |
| 39 | mixamorig:LeftLeg_04 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 40 | mixamorig:LeftUpLeg_03 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 41 | mixamorig:RightToeBase_010 | yes | translation | LINEAR | 32 | 0 | 1.066667 |
| 42 | mixamorig:RightToeBase_010 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 43 | mixamorig:RightFoot_09 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 44 | mixamorig:RightFoot_09 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 45 | mixamorig:RightLeg_08 | yes | translation | LINEAR | 30 | 0 | 1.066667 |
| 46 | mixamorig:RightLeg_08 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 47 | mixamorig:RightUpLeg_022 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |
| 48 | mixamorig:Hips_00 | yes | translation | LINEAR | 33 | 0 | 1.066667 |
| 49 | mixamorig:Hips_00 | yes | rotation | LINEAR | 33 | 0 | 1.066667 |

### Images and materials

- Images: 8; textures: 8; materials: 10.
- Image [0] (image 0): image/png, embedded.
- Image [1] (image 1): image/png, embedded.
- Image [2] (image 2): image/png, embedded.
- Image [3] (image 3): image/png, embedded.
- Image [4] (image 4): image/png, embedded.
- Image [5] (image 5): image/png, embedded.
- Image [6] (image 6): image/png, embedded.
- Image [7] (image 7): image/png, embedded.
- Material [0] unnamed_0: OPAQUE, double-sided=true.
- Material [1] Material__37: OPAQUE, double-sided=true.
- Material [2] Material__50: OPAQUE, double-sided=true.
- Material [3] Material__89: OPAQUE, double-sided=true.
- Material [4] Material__115: OPAQUE, double-sided=true.
- Material [5] Material__76: OPAQUE, double-sided=true.
- Material [6] Material__63: OPAQUE, double-sided=true.
- Material [7] Material__139: OPAQUE, double-sided=true.
- Material [8] Material__152: OPAQUE, double-sided=true.
- Material [9] Material__127: OPAQUE, double-sided=true.

### License/source metadata found in the GLB

```json
{
  "copyright": null,
  "generator": "Sketchfab-15.18.0",
  "assetExtras": {
    "author": "Ltti....................Ttg (https://sketchfab.com/Ltti....................Ttg)",
    "license": "CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)",
    "source": "https://sketchfab.com/3d-models/messi-2023-3d-free-38fb7c1839064abd9e0a1b7e1e7d68a9",
    "title": "messi 2023 3d free"
  },
  "documentExtras": null,
  "documentExtensions": null
}
```

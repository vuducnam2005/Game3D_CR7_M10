import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type RefObject } from 'react';
import { AdditiveBlending, Color, DoubleSide, Group, InstancedMesh, Mesh, MeshBasicMaterial, Object3D, Points, Shape } from 'three';
import type { GameState, Team } from '../../shared/game';
import type { MockAudio } from '../live/MockAudio';
import { animationMarkers, effectBudget, resultPresentation } from '../live/presentationEvents';
import type { MotionFrames } from './CameraController';
import { PLAYER_X, isCelebrating } from './cameraRig';
import type { QualityLevel } from './quality';

export function CelebrationEffects({ state, frames, level, requests, audio }: {
  state: GameState; frames: RefObject<MotionFrames>; level: QualityLevel;
  requests: Record<Team, number>; audio?: MockAudio;
}) {
  return <>{(['ronaldo', 'messi'] as const).map(team => <TeamEffects key={team} team={team} state={state} frames={frames} level={level} request={requests[team]} audio={audio} />)}</>;
}

function TeamEffects({ team, state, frames, level, request, audio }: {
  team: Team; state: GameState; frames: RefObject<MotionFrames>; level: QualityLevel; request: number; audio?: MockAudio;
}) {
  const p = state.presentation;
  const budget = effectBudget(level, p.effects, p.heavyEffects, p.reducedMotion);
  const result = resultPresentation(state);
  const root = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  const aura = useRef<Mesh>(null);
  const flash = useRef<Mesh>(null);
  const particles = useRef<Points>(null);
  const confetti = useRef<InstancedMesh>(null);
  const stars = useRef<InstancedMesh>(null);
  const trophy = useRef<Group>(null);
  const cookie = useRef<Group>(null);
  const markers = useRef({ request: -1, seen: new Set<string>(), sound: 'none' as NonNullable<GameState['live']['celebrations']['messi']['active']>['sound'], tier: 0, enabled: true });
  const queuedMetadata = useRef(new Map<number, { sound: typeof markers.current.sound; tier: number; enabled: boolean }>());
  const dummy = useMemo(() => new Object3D(), []);
  const color = team === 'ronaldo' ? '#ff553c' : '#59cfff';
  const particlePositions = useMemo(() => new Float32Array(budget.particles * 3), [budget.particles]);
  const starShape = useMemo(() => {
    const shape = new Shape();
    for (let i = 0; i < 10; i++) {
      const angle = i * Math.PI / 5, radius = i % 2 ? .045 : .11;
      if (i === 0) shape.moveTo(Math.sin(angle) * radius, Math.cos(angle) * radius);
      else shape.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius);
    }
    shape.closePath(); return shape;
  }, []);
  const palette = useMemo(() => [new Color(color), new Color(team === 'ronaldo' ? '#ffd568' : '#ffffff')], [color, team]);

  useFrame(() => {
    const frame = frames.current[team];
    const active = !!frame && isCelebrating(frame) && (!result || result.outcome === team);
    if (!queuedMetadata.current.has(request)) {
      const cue = state.live.celebrations[team].active;
      queuedMetadata.current.set(request, { sound: cue?.sound ?? 'gift', tier: cue?.tier ?? 0, enabled: !!result || cue?.effect !== 'none' });
      if (queuedMetadata.current.size > 8) queuedMetadata.current.delete(queuedMetadata.current.keys().next().value!);
    }
    const playingRequest = frame?.request ?? 0;
    if (markers.current.request !== playingRequest) markers.current = { ...markers.current, ...queuedMetadata.current.get(playingRequest), request: playingRequest, seen: new Set() };
    if (active && frame && playingRequest > 0) {
      for (const marker of animationMarkers(frame)) {
        if (frame.time < marker.at || markers.current.seen.has(marker.kind)) continue;
        markers.current.seen.add(marker.kind);
        // A silent mapping also silences its celebration; match results have their own sound.
        if (!result && markers.current.sound === 'none') continue;
        if (marker.kind === 'gift') { if (!result) audio?.play(markers.current.sound); }
        else if (marker.kind !== 'combo' || markers.current.tier > 0) audio?.play(marker.kind);
      }
    }
    if (cookie.current) {
      const eating = team === 'messi' && active && frame?.name === 'Messi Eat Cookie' && frame.time >= .25 && frame.time < 1.6;
      cookie.current.visible = eating;
      if (eating && frame) {
        const move = Math.min(1, Math.max(0, (frame.time - .25) / .9));
        cookie.current.position.set(PLAYER_X.messi + .48 * (1 - move), 2.15 + .52 * move, .55);
        cookie.current.scale.setScalar(frame.time > 1.2 ? Math.max(.05, 1 - (frame.time - 1.2) / .4) : 1);
      }
    }
    if (!root.current) return;
    root.current.visible = active && p.effects && markers.current.enabled;
    if (!active || !frame || !root.current.visible) return;
    const t = frame.time;
    if (aura.current) {
      const scale = p.reducedMotion ? 1 : 1 + Math.sin(t * 4) * .06;
      aura.current.scale.set(scale, 1, scale);
    }
    if (ring.current) {
      const impact = frame.name === 'SIUUU' ? 2.62 : .8;
      const age = t - impact;
      ring.current.visible = !p.reducedMotion && age >= 0 && age < .7;
      ring.current.scale.setScalar(1 + Math.max(0, age) * 2);
      (ring.current.material as MeshBasicMaterial).opacity = Math.max(0, .75 * (1 - age / .7));
    }
    if (flash.current) {
      const age = t - (team === 'ronaldo' ? 2.62 : .8);
      flash.current.visible = budget.flash && age >= 0 && age < .35;
      (flash.current.material as MeshBasicMaterial).opacity = Math.max(0, .12 * (1 - age / .35));
    }
    if (particles.current) {
      for (let i = 0; i < budget.particles; i++) {
        const angle = i * 2.4 + t * .5, radius = .65 + (i % 7) * .05;
        particlePositions[i * 3] = Math.cos(angle) * radius;
        particlePositions[i * 3 + 1] = ((i * .173 + t * .8) % 3.3) + .1;
        particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
    if (confetti.current) {
      for (let i = 0; i < budget.confetti; i++) {
        const seed = i * 1.618;
        dummy.position.set(Math.sin(seed) * 1.25, 4.4 - ((t * .9 + i * .071) % 4.2), Math.cos(seed) * .9);
        dummy.rotation.set(t + seed, t * 1.5 + seed, seed);
        dummy.scale.setScalar(1); dummy.updateMatrix();
        confetti.current.setMatrixAt(i, dummy.matrix); confetti.current.setColorAt(i, palette[i % 2]);
      }
      confetti.current.instanceMatrix.needsUpdate = true;
      if (confetti.current.instanceColor) confetti.current.instanceColor.needsUpdate = true;
    }
    if (stars.current) {
      for (let i = 0; i < budget.stars; i++) {
        const angle = i * Math.PI * 2 / budget.stars + t * .3;
        dummy.position.set(Math.cos(angle) * 1.1, 2.3 + Math.sin(angle) * 1.25, .3);
        dummy.rotation.set(0, 0, t * .2); dummy.scale.setScalar(1); dummy.updateMatrix(); stars.current.setMatrixAt(i, dummy.matrix);
      }
      stars.current.instanceMatrix.needsUpdate = true;
    }
    if (trophy.current) {
      trophy.current.visible = p.trophy && frame.name === 'Messi Victory' && t >= 1.6 && t < 4.9;
      trophy.current.position.y = p.reducedMotion ? 4.2 : 3.9 + Math.min(1, Math.max(0, t - 1.6)) * .3;
    }
  });

  return <><group ref={root} position={[PLAYER_X[team], 0, 0]} visible={false}>
    <mesh ref={aura} position={[0, .7, 0]}><cylinderGeometry args={[.8, 1.05, 1.3, 24, 1, true]} /><meshBasicMaterial color={color} transparent opacity={.1} side={DoubleSide} depthWrite={false} blending={AdditiveBlending} /></mesh>
    <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, .025, 0]}><ringGeometry args={[.55, .62, 40]} /><meshBasicMaterial color={team === 'ronaldo' ? '#ffd568' : '#ffffff'} transparent side={DoubleSide} depthWrite={false} /></mesh>
    <mesh ref={flash} position={[0, 1.8, -.7]}><sphereGeometry args={[2.4, 12, 8]} /><meshBasicMaterial color={team === 'ronaldo' ? '#ffe8a7' : '#ffffff'} transparent depthWrite={false} blending={AdditiveBlending} /></mesh>
    {budget.particles > 0 && <points ref={particles} frustumCulled={false}><bufferGeometry><bufferAttribute attach="attributes-position" args={[particlePositions, 3]} /></bufferGeometry><pointsMaterial color={team === 'ronaldo' ? '#ffd568' : '#d9f7ff'} size={.055} transparent opacity={.8} depthWrite={false} /></points>}
    {budget.confetti > 0 && <instancedMesh ref={confetti} args={[undefined, undefined, budget.confetti]} frustumCulled={false}><planeGeometry args={[.07, .12]} /><meshBasicMaterial side={DoubleSide} /></instancedMesh>}
    {team === 'messi' && budget.stars > 0 && <instancedMesh ref={stars} args={[undefined, undefined, budget.stars]} frustumCulled={false}><shapeGeometry args={[starShape]} /><meshBasicMaterial color="#e4fbff" side={DoubleSide} /></instancedMesh>}
    {team === 'messi' && <group ref={trophy} position={[0, 4.2, 0]} visible={false}>
      <mesh><cylinderGeometry args={[.24, .1, .3, 16]} /><meshStandardMaterial color="#ffd77a" metalness={.65} roughness={.25} /></mesh>
      <mesh position={[0, -.22, 0]}><cylinderGeometry args={[.04, .07, .18, 8]} /><meshStandardMaterial color="#ffd77a" metalness={.65} roughness={.25} /></mesh>
      <mesh position={[0, -.34, 0]}><boxGeometry args={[.3, .08, .24]} /><meshStandardMaterial color="#173a55" /></mesh>
      {[-1, 1].map(side => <mesh key={side} position={[side * .22, 0, 0]}><torusGeometry args={[.12, .025, 6, 12]} /><meshStandardMaterial color="#ffd77a" metalness={.65} roughness={.25} /></mesh>)}
    </group>}
  </group>
  {team === 'messi' && <group ref={cookie} visible={false}>
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.16, .16, .035, 24]} /><meshStandardMaterial color="#ba763b" roughness={.9} /></mesh>
    {[[-.07, .06], [.07, .04], [0, -.07]].map(([x, y], index) => <mesh key={index} position={[x, y, .025]}><sphereGeometry args={[.025, 8, 8]} /><meshStandardMaterial color="#4b2a22" roughness={1} /></mesh>)}
  </group>}</>;
}

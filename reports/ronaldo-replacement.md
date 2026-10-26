# Ronaldo replacement verification - 2026-10-21

## Authority and prompt mapping

The user explicitly replaced `C:\3d\ronaldo_rigged.glb` with `C:\3d\cristiano_ronaldo.glb` and requested analysis and application updates. This changes the asset path in PROMPT sections 1/3/6; all remaining requirements are retained. PROMPT.md is not edited.

Historical Phase 1 reports (`glb-analysis.*`, `phase-1-summary.md`) describe the old asset, not this replacement. Current machine/container analysis is in `current-glb-analysis.json` and `.md`. CPU GLTFLoader pose sampling is in `ronaldo-runtime-analysis.json`.

## Verified new asset

| Property | New Ronaldo |
|---|---|
| File size | 16,139,240 bytes |
| GLB | 2.0 |
| Meshes / triangles | 8 / 118,395 |
| Skin / joints | 1 / 435 |
| Materials / embedded textures | 8 / 9 (7 JPEG, 2 PNG) |
| Original clip | Armature.001Action.001 |
| Clip duration / tracks | 3.983333349 s / 1,249 |
| SHA-256 | 78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74 |
| Metadata author / license | aleganda / CC BY 4.0 |

Meshes: Object_0 through Object_7. Materials: uniform, legs, boots, material, face, eyelash, eyes, hair. Full bones, hierarchy and track targets are in the generated report. The new Rigify-style DEF/ORG/MCH/control hierarchy is not compatible with the old 17-joint rig or Messi's Mixamo rig. No cross-rig tracks were copied.

## Coordinates, ground, camera

- Runtime skinned rest bounds: min [-2.259380, 0.012089, -0.165018], max [-0.852670, 1.838462, 0.168842].
- Rest height: 1.826373. Target reference height: 3.15. Uniform scale: about 1.724728.
- Raw unskinned node bounds are centered at positive X; actual skinned model is at negative X. Using raw POSITION bounds would place the model incorrectly. Runtime vertex skinning is used for normalization.
- Parent transforms center X/Z without altering source vertices, bind matrices or bone rest transforms.
- 81 CPU pose samples give minimum Y=0.000748 and peak Y=2.805228. Use source floor Y=0 instead of subtracting rest min Y=0.012089; the latter sinks soles during landing. Sampling is not an exhaustive proof for every interpolated instant.
- The source clip begins facing away from the camera and turns to face the camera on landing. Idle is derived from its final front-facing pose. This half-turn is retained, not flattened away.
- Camera target [0, 2.25, 0], position [0, 3, 9] leaves headroom for the jump. Rest bounds helper is intentionally static; limbs may leave that reference box during animation.
- SkeletonHelper is attached outside the normalization group so the parent scale is not applied twice. Rigify control bones create extra lines outside the body; those are actual source controls, not replacement geometry.
- Self-shadow acne removed; local fill lights and PCF ground shadows replace the remote HDR dependency. Materials and texture bindings remain intact.

## Animation behavior

- Original clip retained under its real name and available for inspection.
- Visual verification: initial hand gesture, crouch, upward jump with raised arms, half-turn, wide-legged landing with arms lowered outward. This is recognizably a SIUUU-style motion; no claim of 100% real-life fidelity.
- SIUUU: independent clone of the original clip, same duration and 1,249 tracks, played once.
- Idle: all tracks sampled at their last keyframe, looped for 3 seconds, with small chest/head breathing offsets. This is a derived landing stance, not an embedded Idle or a newly authored neutral standing motion.
- Crossfade, queue/cooldown, pause/resume, speed, and automatic return to Idle are available. Faded actions are stopped after transition completion.
- Choosing a clip no longer starts playback accidentally after an earlier Play request. Paused pose preview allows inspecting exact times.
- Calma, Sleep, Power Pose, and Point Up are absent from the new file. They are neither fabricated nor silently mapped to SIUUU. These Phase 2 requirements remain unchecked.

## Evidence and tests

- `npm run analyze:models`: passes with the two current root assets; writes current reports without overwriting historical Phase 1 reports.
- `node scripts/inspect-runtime-model.mjs`: loads the real rig through GLTFLoader and samples 81 poses. Images are intentionally skipped only in this CPU diagnostic; it is not visual proof.
- `npx --yes @gltf-transform/cli validate cristiano_ronaldo.glb --format csv --limit 8`: exit 0; displayed 8 informational UNUSED_OBJECT notices for unused UV sets. Output is limited, not claimed as a full diagnostic listing.
- Browser WebGL2: Ronaldo renders 8 meshes, 435 bones, 9 texture bindings and correct file size (HTTP 200). Idle, SIUUU jump/landing/return, pause/pose preview, selection without auto-play and skeleton overlay verified.
- Messi regression: 10 meshes, 34 bones, 8 textures; Celebrate raises both arms and returns to Messi Idle. No Ronaldo tracks applied to Messi.
- Mobile 720x1280: document scrollWidth=705 <= viewport 720; no horizontal overflow. Jump remains fully inside the canvas. Debug page scrolls vertically; this is not the future 9:16 livestream overlay.
- Browser console: no errors in this test run. Remaining dependency warning: THREE.Clock is deprecated in favor of THREE.Timer.
- `npm run typecheck`, `npm run test`, `npm run build`: pass (9 tests). Build retains a large-bundle warning (~1.25 MB JS / 346 KB gzip); performance optimization is still pending.
- Original/current public asset SHA-256 hashes match. Messi checksum remains 92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7. The historical Ronaldo checksum is recorded for traceability only; the unlicensed historical asset is excluded from the public repository.

Screenshots:

- `ronaldo-replacement-debug.jpg`: current Ronaldo render and diagnostics.
- `ronaldo-siuuu-mobile.jpg`: airborne SIUUU pose in 720x1280.
- `messi-celebrate-regression.jpg`: Messi arm-raise regression.

## Remaining Phase 2 work

Phase 2 is NOT complete. Four old Ronaldo actions are missing; Messi Victory is still a preliminary forward slide/arm-spread rather than a verified articulated step followed by raised arms. Side-by-side comparison and full animation-quality/performance acceptance are pending. No stadium, gameplay, TikTok connection or future-phase completion is claimed.

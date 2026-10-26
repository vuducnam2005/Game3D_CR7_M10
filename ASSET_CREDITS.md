# Asset credits

Metadata read from the GLB files on 2026-10-21. Original containers are not modified.

## Current Ronaldo: cristiano_ronaldo.glb

- Title: cristiano ronaldo
- Author: aleganda (https://sketchfab.com/aleganda)
- Source: https://sketchfab.com/3d-models/cristiano-ronaldo-710d1b01b0624135861feb3f0bb7048a
- License in metadata: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
- Generator: Sketchfab-16.75.0
- Application changes: uniform parent normalization; SIUUU is an independent copy of the embedded animation; Idle uses the final animated pose with a small breathing movement. Calma, Sleep, Power Pose, and Point Up are additional runtime-authored clips on an isolated copy of this rig, not embedded originals. No source geometry, textures, skin, or original animation is overwritten.
- The user supplied this replacement for the earlier ronaldo_rigged.glb. No model was downloaded by the application developer.

## Messi: messi_2023_3d_free.glb

- Title: messi 2023 3d free
- Author: Ltti....................Ttg (https://sketchfab.com/Ltti....................Ttg)
- Source: https://sketchfab.com/3d-models/messi-2023-3d-free-38fb7c1839064abd9e0a1b7e1e7d68a9
- License in metadata: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
- Application changes: uniform parent normalization and additional runtime procedural Idle, Celebrate, and Victory clips. Victory includes two-bone leg IK for short forward/return steps, arm spreading, and raised arms. The original asset and embedded mixamo.com clip remain unchanged. Runtime playback of mixamo.com uses an independent derived copy whose hips Y track is shifted to align its initial floor with the rest-pose floor; the debug UI labels this copy DERIVED.

## Stadium scene

- Pitch, field markings, ball, stands, instanced crowd, floodlights, stars, and LED artwork are generated locally using geometry and CanvasTexture.
- No external stadium models, images, fonts, logos, voice, or music were downloaded for Phase 3. Player-kit artwork already present in the supplied GLBs is retained, not newly licensed by this project.

## Phase 7 effects and audio

Phase 7 VFX and trophy use locally authored Three.js geometry. All bundled sound effects are synthesized with Web Audio; no external recordings or music are included. Streamer-provided files in public/audio remain the streamer's responsibility. The temporary test WAV was generated locally and removed after validation.

## Phase 8 connector dependency

- Package: `tiktok-live-connector` 2.5.0, pinned in package.json/package-lock.json.
- Maintainer source: https://github.com/zerodytrash/TikTok-Live-Connector
- Installed package license: **AGPL-3.0-only**, see `node_modules/tiktok-live-connector/LICENSE` and package metadata. This is a software dependency license, separate from the GLB licenses; review its distribution/network-use obligations before distributing or hosting this integration.
- Unofficial read-only LIVE connection using TikTok endpoints and the Euler Stream signing service; not an official TikTok SDK or endorsement. No account/session cookies, recordings, music or external artwork were obtained in this phase.

## Historical Ronaldo: ronaldo_rigged.glb

- No author, source, or license found in its metadata.
- The application no longer loads or preloads this historical asset, and it is excluded from the public repository.
- No commercial-use rights are asserted for this historical asset.

Credit the authors and license, link to the sources, and indicate modifications when distributing the current models. Metadata is not independent verification of the uploader's rights; a model license does not necessarily grant publicity, trademark, or logo rights. No external copyrighted voice, music, or logos have been downloaded.

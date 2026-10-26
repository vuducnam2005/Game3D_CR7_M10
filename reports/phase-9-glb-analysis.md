# GLB VERIFICATION REPORT

Generated: 2026-10-23T09:12:02.452Z

> This report is generated directly from the original GLB containers. No model file is modified.
> Geometry bounds use POSITION and node transforms, without skin deformation. Runtime skinned bounds must be measured separately before normalization.

## Summary

| File | Bytes | SHA-256 | Meshes | Triangles (unique) | Skins | Joints | Animations | Images | Height Y | Ground Y |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| cristiano_ronaldo.glb | 16139240 | `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74` | 8 | 118395 | 1 | 435 | 1 | 9 | 1.826372 | 0.01209 |
| messi_2023_3d_free.glb | 10881188 | `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7` | 10 | 29554 | 1 | 34 | 1 | 8 | 0.963145 | -0.484724 |

## cristiano_ronaldo.glb

- Source: `C:\3d\cristiano_ronaldo.glb`
- GLB: version 2, 16139240 bytes
- SHA-256: `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`
- Asset metadata: `{"extras":{"author":"aleganda (https://sketchfab.com/aleganda)","license":"CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)","source":"https://sketchfab.com/3d-models/cristiano-ronaldo-710d1b01b0624135861feb3f0bb7048a","title":"cristiano ronaldo"},"generator":"Sketchfab-16.75.0","version":"2.0"}`
- Extensions used: KHR_materials_specular
- Counts: 8 meshes, 118395 unique triangles, 118395 instantiated triangles, 1 skin, 435 joints, 8 materials, 9 images.
- Coordinate convention: +Y (glTF 2.0 convention), right-handed (glTF 2.0 convention).
- World geometry bounds: min [0.85267, 0.01209, -0.168843], max [2.25938, 1.838462, 0.165016], size [1.40671, 1.826372, 0.333859], center [1.556025, 0.925276, -0.001913].
- Height on Y: 1.826372; geometric ground/min Y: 0.01209.

### Root transforms

- [0] Sketchfab_model: translation [0, 0, 0], rotation [0, 0, 0, 1], scale [1, 1, 1], matrix [0.971337, 0, 0, 0, 0, 0, -0.971337, 0, 0, 0.971337, 0, 0, 0, 0, 0, 1]

### Meshes and primitives

- [0] Object_0: 1 primitive(s)
  - Primitive 0: TRIANGLES, 28343 triangles, material uniform, POSITION accessor 0 (14758 vertices)
- [1] Object_1: 1 primitive(s)
  - Primitive 0: TRIANGLES, 5876 triangles, material legs, POSITION accessor 5 (3107 vertices)
- [2] Object_2: 1 primitive(s)
  - Primitive 0: TRIANGLES, 11720 triangles, material boots, POSITION accessor 10 (6660 vertices)
- [3] Object_3: 1 primitive(s)
  - Primitive 0: TRIANGLES, 33784 triangles, material material, POSITION accessor 16 (18176 vertices)
- [4] Object_4: 1 primitive(s)
  - Primitive 0: TRIANGLES, 18448 triangles, material face, POSITION accessor 21 (9525 vertices)
- [5] Object_5: 1 primitive(s)
  - Primitive 0: TRIANGLES, 1456 triangles, material eyelash, POSITION accessor 26 (780 vertices)
- [6] Object_6: 1 primitive(s)
  - Primitive 0: TRIANGLES, 196 triangles, material eyes, POSITION accessor 31 (130 vertices)
- [7] Object_7: 1 primitive(s)
  - Primitive 0: TRIANGLES, 18572 triangles, material hair, POSITION accessor 36 (11940 vertices)

### Mesh instances and bounds

- Node [7] Object_7 -> mesh [0] Object_0, skin 0, 28343 triangles, bounds min [1.205984, 0.076064, -0.168843] max [1.906067, 1.584841, 0.101752]
- Node [8] Object_8 -> mesh [1] Object_1, skin 0, 5876 triangles, bounds min [1.342582, 0.523887, -0.104266] max [1.769469, 0.782805, 0.072737]
- Node [9] Object_9 -> mesh [2] Object_2, skin 0, 11720 triangles, bounds min [1.294396, 0.01209, -0.125946] max [1.817655, 0.129897, 0.165016]
- Node [10] Object_10 -> mesh [3] Object_3, skin 0, 33784 triangles, bounds min [0.85267, 0.957718, -0.110493] max [2.25938, 1.429412, 0.098574]
- Node [11] Object_11 -> mesh [4] Object_4, skin 0, 18448 triangles, bounds min [1.461382, 1.401153, -0.11496] max [1.650711, 1.819835, 0.094045]
- Node [12] Object_12 -> mesh [5] Object_5, skin 0, 1456 triangles, bounds min [1.503357, 1.706261, 0.049897] max [1.599168, 1.723511, 0.072463]
- Node [13] Object_13 -> mesh [6] Object_6, skin 0, 196 triangles, bounds min [1.510487, 1.712121, 0.049773] max [1.591977, 1.721324, 0.06034]
- Node [14] Object_14 -> mesh [7] Object_7, skin 0, 18572 triangles, bounds min [1.47282, 1.712883, -0.115682] max [1.624735, 1.838462, 0.06103]

### Skins and skeleton hierarchy

#### Skin [0] (skin 0)

Joints: 435; skeleton root: GLTF_created_0_rootJoint; inverse bind accessor: 41.

```text
+-- [5] GLTF_created_0_rootJoint
   +-- [15] root_69
   |  +-- [16] DEF-spine_64
   |  |  +-- [17] DEF-spine.001_63
   |  |     +-- [18] DEF-spine.002_62
   |  |        +-- [19] DEF-spine.003_61
   |  |           +-- [20] DEF-spine.004_60
   |  |              +-- [21] DEF-spine.005_59
   |  |                 +-- [22] DEF-spine.006_58
   |  +-- [23] VIS_upper_arm_ik_pole.L_65
   |  +-- [24] VIS_upper_arm_ik_pole.R_66
   |  +-- [25] VIS_thigh_ik_pole.L_67
   |  +-- [26] VIS_thigh_ik_pole.R_68
   +-- [27] MCH-torso.parent_453
   |  +-- [28] torso_452
   |     +-- [29] hips_70
   |     +-- [30] chest_71
   |     +-- [31] MCH-spine.001_162
   |     |  +-- [32] spine_fk.001_161
   |     |     +-- [33] MCH-spine_160
   |     |        +-- [34] spine_fk_159
   |     |           +-- [35] tweak_spine_155
   |     |           |  +-- [36] ORG-spine_154
   |     |           |     +-- [37] ORG-pelvis.L_73
   |     |           |     |  +-- [38] DEF-pelvis.L_72
   |     |           |     +-- [39] ORG-pelvis.R_75
   |     |           |     |  +-- [40] DEF-pelvis.R_74
   |     |           |     +-- [41] ORG-thigh.L_93
   |     |           |     |  +-- [42] ORG-shin.L_87
   |     |           |     |  |  +-- [43] ORG-foot.L_80
   |     |           |     |  |  |  +-- [44] ORG-toe.L_76
   |     |           |     |  |  |  +-- [45] ORG-heel.02.L_77
   |     |           |     |  |  |  +-- [46] MCH-foot_tweak.L_79
   |     |           |     |  |  |     +-- [47] foot_tweak.L_78
   |     |           |     |  |  +-- [48] MCH-shin_tweak.L_82
   |     |           |     |  |  |  +-- [49] shin_tweak.L_81
   |     |           |     |  |  +-- [50] MCH-shin_tweak.L.001_84
   |     |           |     |  |  |  +-- [51] shin_tweak.L.001_83
   |     |           |     |  |  +-- [52] MCH-shin_tweak.L.002_86
   |     |           |     |  |     +-- [53] shin_tweak.L.002_85
   |     |           |     |  +-- [54] MCH-thigh_parent_widget.L_88
   |     |           |     |  +-- [55] MCH-thigh_tweak.L.001_90
   |     |           |     |  |  +-- [56] thigh_tweak.L.001_89
   |     |           |     |  +-- [57] MCH-thigh_tweak.L.002_92
   |     |           |     |     +-- [58] thigh_tweak.L.002_91
   |     |           |     +-- [59] ORG-thigh.R_111
   |     |           |     |  +-- [60] ORG-shin.R_105
   |     |           |     |  |  +-- [61] ORG-foot.R_98
   |     |           |     |  |  |  +-- [62] ORG-toe.R_94
   |     |           |     |  |  |  +-- [63] ORG-heel.02.R_95
   |     |           |     |  |  |  +-- [64] MCH-foot_tweak.R_97
   |     |           |     |  |  |     +-- [65] foot_tweak.R_96
   |     |           |     |  |  +-- [66] MCH-shin_tweak.R_100
   |     |           |     |  |  |  +-- [67] shin_tweak.R_99
   |     |           |     |  |  +-- [68] MCH-shin_tweak.R.001_102
   |     |           |     |  |  |  +-- [69] shin_tweak.R.001_101
   |     |           |     |  |  +-- [70] MCH-shin_tweak.R.002_104
   |     |           |     |  |     +-- [71] shin_tweak.R.002_103
   |     |           |     |  +-- [72] MCH-thigh_parent_widget.R_106
   |     |           |     |  +-- [73] MCH-thigh_tweak.R.001_108
   |     |           |     |  |  +-- [74] thigh_tweak.R.001_107
   |     |           |     |  +-- [75] MCH-thigh_tweak.R.002_110
   |     |           |     |     +-- [76] thigh_tweak.R.002_109
   |     |           |     +-- [77] thigh_parent.L_112
   |     |           |     +-- [78] MCH-thigh_parent.L_122
   |     |           |     |  +-- [79] thigh_fk.L_118
   |     |           |     |  |  +-- [80] shin_fk.L_117
   |     |           |     |  |     +-- [81] MCH-foot_fk.L_116
   |     |           |     |  |        +-- [82] foot_fk.L_115
   |     |           |     |  |           +-- [83] MCH-toe_fk.L_114
   |     |           |     |  |              +-- [84] toe_fk.L_113
   |     |           |     |  +-- [85] MCH-thigh_ik_swing.L_121
   |     |           |     |     +-- [86] thigh_ik.L_120
   |     |           |     |        +-- [87] MCH-shin_ik.L_119
   |     |           |     +-- [88] MCH-thigh_tweak.L_124
   |     |           |     |  +-- [89] thigh_tweak.L_123
   |     |           |     +-- [90] DEF-thigh.L_132
   |     |           |     |  +-- [91] DEF-thigh.L.001_131
   |     |           |     |     +-- [92] DEF-thigh.L.002_130
   |     |           |     |        +-- [93] DEF-shin.L_129
   |     |           |     |           +-- [94] DEF-shin.L.001_128
   |     |           |     |              +-- [95] DEF-shin.L.002_127
   |     |           |     |                 +-- [96] DEF-foot.L_126
   |     |           |     |                    +-- [97] DEF-toe.L_125
   |     |           |     +-- [98] thigh_parent.R_133
   |     |           |     +-- [99] MCH-thigh_parent.R_143
   |     |           |     |  +-- [100] thigh_fk.R_139
   |     |           |     |  |  +-- [101] shin_fk.R_138
   |     |           |     |  |     +-- [102] MCH-foot_fk.R_137
   |     |           |     |  |        +-- [103] foot_fk.R_136
   |     |           |     |  |           +-- [104] MCH-toe_fk.R_135
   |     |           |     |  |              +-- [105] toe_fk.R_134
   |     |           |     |  +-- [106] MCH-thigh_ik_swing.R_142
   |     |           |     |     +-- [107] thigh_ik.R_141
   |     |           |     |        +-- [108] MCH-shin_ik.R_140
   |     |           |     +-- [109] MCH-thigh_tweak.R_145
   |     |           |     |  +-- [110] thigh_tweak.R_144
   |     |           |     +-- [111] DEF-thigh.R_153
   |     |           |        +-- [112] DEF-thigh.R.001_152
   |     |           |           +-- [113] DEF-thigh.R.002_151
   |     |           |              +-- [114] DEF-shin.R_150
   |     |           |                 +-- [115] DEF-shin.R.001_149
   |     |           |                    +-- [116] DEF-shin.R.002_148
   |     |           |                       +-- [117] DEF-foot.R_147
   |     |           |                          +-- [118] DEF-toe.R_146
   |     |           +-- [119] tweak_spine.001_157
   |     |           |  +-- [120] ORG-spine.001_156
   |     |           +-- [121] MCH-WGT-hips_158
   |     +-- [122] MCH-spine.002_451
   |        +-- [123] spine_fk.002_450
   |           +-- [124] MCH-pivot_165
   |           |  +-- [125] tweak_spine.002_164
   |           |     +-- [126] ORG-spine.002_163
   |           +-- [127] MCH-spine.003_449
   |              +-- [128] spine_fk.003_448
   |                 +-- [129] ORG-spine.004_168
   |                 |  +-- [130] ORG-spine.005_167
   |                 |     +-- [131] ORG-spine.006_166
   |                 +-- [132] MCH-ROT-neck_176
   |                 |  +-- [133] neck_175
   |                 |     +-- [134] MCH-ROT-head_170
   |                 |     |  +-- [135] head_169
   |                 |     +-- [136] tweak_spine.004_171
   |                 |     +-- [137] MCH-STR-neck_174
   |                 |        +-- [138] MCH-spine.005_173
   |                 |           +-- [139] tweak_spine.005_172
   |                 +-- [140] tweak_spine.003_446
   |                 |  +-- [141] ORG-spine.003_445
   |                 |     +-- [142] ORG-shoulder.L_306
   |                 |     |  +-- [143] ORG-upper_arm.L_192
   |                 |     |  |  +-- [144] ORG-forearm.L_186
   |                 |     |  |  |  +-- [145] ORG-hand.L_179
   |                 |     |  |  |  |  +-- [146] MCH-hand_tweak.L_178
   |                 |     |  |  |  |     +-- [147] hand_tweak.L_177
   |                 |     |  |  |  +-- [148] MCH-forearm_tweak.L_181
   |                 |     |  |  |  |  +-- [149] forearm_tweak.L_180
   |                 |     |  |  |  +-- [150] MCH-forearm_tweak.L.001_183
   |                 |     |  |  |  |  +-- [151] forearm_tweak.L.001_182
   |                 |     |  |  |  +-- [152] MCH-forearm_tweak.L.002_185
   |                 |     |  |  |     +-- [153] forearm_tweak.L.002_184
   |                 |     |  |  +-- [154] MCH-upper_arm_parent_widget.L_187
   |                 |     |  |  +-- [155] MCH-upper_arm_tweak.L.001_189
   |                 |     |  |  |  +-- [156] upper_arm_tweak.L.001_188
   |                 |     |  |  +-- [157] MCH-upper_arm_tweak.L.002_191
   |                 |     |  |     +-- [158] upper_arm_tweak.L.002_190
   |                 |     |  +-- [159] DEF-shoulder.L_193
   |                 |     |  +-- [160] upper_arm_parent.L_194
   |                 |     |  +-- [161] MCH-upper_arm_parent.L_202
   |                 |     |  |  +-- [162] upper_arm_fk.L_198
   |                 |     |  |  |  +-- [163] forearm_fk.L_197
   |                 |     |  |  |     +-- [164] MCH-hand_fk.L_196
   |                 |     |  |  |        +-- [165] hand_fk.L_195
   |                 |     |  |  +-- [166] MCH-upper_arm_ik_swing.L_201
   |                 |     |  |     +-- [167] upper_arm_ik.L_200
   |                 |     |  |        +-- [168] MCH-forearm_ik.L_199
   |                 |     |  +-- [169] MCH-upper_arm_tweak.L_204
   |                 |     |  |  +-- [170] upper_arm_tweak.L_203
   |                 |     |  +-- [171] DEF-upper_arm.L_305
   |                 |     |     +-- [172] DEF-upper_arm.L.001_304
   |                 |     |        +-- [173] DEF-upper_arm.L.002_303
   |                 |     |           +-- [174] DEF-forearm.L_302
   |                 |     |              +-- [175] DEF-forearm.L.001_301
   |                 |     |                 +-- [176] DEF-forearm.L.002_300
   |                 |     |                    +-- [177] DEF-hand.L_299
   |                 |     |                       +-- [178] ORG-palm.01.L_240
   |                 |     |                       |  +-- [179] ORG-f_index.01.L_207
   |                 |     |                       |  |  +-- [180] ORG-f_index.02.L_206
   |                 |     |                       |  |     +-- [181] ORG-f_index.03.L_205
   |                 |     |                       |  +-- [182] ORG-thumb.01.L_210
   |                 |     |                       |  |  +-- [183] ORG-thumb.02.L_209
   |                 |     |                       |  |     +-- [184] ORG-thumb.03.L_208
   |                 |     |                       |  +-- [185] DEF-f_index.01.L_213
   |                 |     |                       |  |  +-- [186] DEF-f_index.02.L_212
   |                 |     |                       |  |     +-- [187] DEF-f_index.03.L_211
   |                 |     |                       |  +-- [188] f_index.01_master.L_214
   |                 |     |                       |  +-- [189] DEF-thumb.01.L_217
   |                 |     |                       |  |  +-- [190] DEF-thumb.02.L_216
   |                 |     |                       |  |     +-- [191] DEF-thumb.03.L_215
   |                 |     |                       |  +-- [192] thumb.01_master.L_218
   |                 |     |                       |  +-- [193] DEF-palm.01.L_219
   |                 |     |                       |  +-- [194] MCH-f_index.01_drv.L_228
   |                 |     |                       |  |  +-- [195] f_index.01.L_227
   |                 |     |                       |  |     +-- [196] MCH-f_index.02_drv.L_226
   |                 |     |                       |  |        +-- [197] f_index.02.L_225
   |                 |     |                       |  |           +-- [198] MCH-f_index.03_drv.L_223
   |                 |     |                       |  |           |  +-- [199] f_index.03.L_222
   |                 |     |                       |  |           |     +-- [200] f_index.01.L.001_220
   |                 |     |                       |  |           |     +-- [201] MCH-f_index.03.L_221
   |                 |     |                       |  |           +-- [202] MCH-f_index.02.L_224
   |                 |     |                       |  +-- [203] MCH-f_index.01.L_229
   |                 |     |                       |  +-- [204] MCH-thumb.01_drv.L_238
   |                 |     |                       |  |  +-- [205] thumb.01.L_237
   |                 |     |                       |  |     +-- [206] MCH-thumb.02_drv.L_236
   |                 |     |                       |  |        +-- [207] thumb.02.L_235
   |                 |     |                       |  |           +-- [208] MCH-thumb.03_drv.L_233
   |                 |     |                       |  |           |  +-- [209] thumb.03.L_232
   |                 |     |                       |  |           |     +-- [210] thumb.01.L.001_230
   |                 |     |                       |  |           |     +-- [211] MCH-thumb.03.L_231
   |                 |     |                       |  |           +-- [212] MCH-thumb.02.L_234
   |                 |     |                       |  +-- [213] MCH-thumb.01.L_239
   |                 |     |                       +-- [214] ORG-palm.02.L_259
   |                 |     |                       |  +-- [215] ORG-f_middle.01.L_243
   |                 |     |                       |  |  +-- [216] ORG-f_middle.02.L_242
   |                 |     |                       |  |     +-- [217] ORG-f_middle.03.L_241
   |                 |     |                       |  +-- [218] DEF-f_middle.01.L_246
   |                 |     |                       |  |  +-- [219] DEF-f_middle.02.L_245
   |                 |     |                       |  |     +-- [220] DEF-f_middle.03.L_244
   |                 |     |                       |  +-- [221] f_middle.01_master.L_247
   |                 |     |                       |  +-- [222] DEF-palm.02.L_248
   |                 |     |                       |  +-- [223] MCH-f_middle.01_drv.L_257
   |                 |     |                       |  |  +-- [224] f_middle.01.L_256
   |                 |     |                       |  |     +-- [225] MCH-f_middle.02_drv.L_255
   |                 |     |                       |  |        +-- [226] f_middle.02.L_254
   |                 |     |                       |  |           +-- [227] MCH-f_middle.03_drv.L_252
   |                 |     |                       |  |           |  +-- [228] f_middle.03.L_251
   |                 |     |                       |  |           |     +-- [229] f_middle.01.L.001_249
   |                 |     |                       |  |           |     +-- [230] MCH-f_middle.03.L_250
   |                 |     |                       |  |           +-- [231] MCH-f_middle.02.L_253
   |                 |     |                       |  +-- [232] MCH-f_middle.01.L_258
   |                 |     |                       +-- [233] ORG-palm.03.L_278
   |                 |     |                       |  +-- [234] ORG-f_ring.01.L_262
   |                 |     |                       |  |  +-- [235] ORG-f_ring.02.L_261
   |                 |     |                       |  |     +-- [236] ORG-f_ring.03.L_260
   |                 |     |                       |  +-- [237] DEF-f_ring.01.L_265
   |                 |     |                       |  |  +-- [238] DEF-f_ring.02.L_264
   |                 |     |                       |  |     +-- [239] DEF-f_ring.03.L_263
   |                 |     |                       |  +-- [240] f_ring.01_master.L_266
   |                 |     |                       |  +-- [241] DEF-palm.03.L_267
   |                 |     |                       |  +-- [242] MCH-f_ring.01_drv.L_276
   |                 |     |                       |  |  +-- [243] f_ring.01.L_275
   |                 |     |                       |  |     +-- [244] MCH-f_ring.02_drv.L_274
   |                 |     |                       |  |        +-- [245] f_ring.02.L_273
   |                 |     |                       |  |           +-- [246] MCH-f_ring.03_drv.L_271
   |                 |     |                       |  |           |  +-- [247] f_ring.03.L_270
   |                 |     |                       |  |           |     +-- [248] f_ring.01.L.001_268
   |                 |     |                       |  |           |     +-- [249] MCH-f_ring.03.L_269
   |                 |     |                       |  |           +-- [250] MCH-f_ring.02.L_272
   |                 |     |                       |  +-- [251] MCH-f_ring.01.L_277
   |                 |     |                       +-- [252] ORG-palm.04.L_297
   |                 |     |                       |  +-- [253] ORG-f_pinky.01.L_281
   |                 |     |                       |  |  +-- [254] ORG-f_pinky.02.L_280
   |                 |     |                       |  |     +-- [255] ORG-f_pinky.03.L_279
   |                 |     |                       |  +-- [256] DEF-f_pinky.01.L_284
   |                 |     |                       |  |  +-- [257] DEF-f_pinky.02.L_283
   |                 |     |                       |  |     +-- [258] DEF-f_pinky.03.L_282
   |                 |     |                       |  +-- [259] f_pinky.01_master.L_285
   |                 |     |                       |  +-- [260] DEF-palm.04.L_286
   |                 |     |                       |  +-- [261] MCH-f_pinky.01_drv.L_295
   |                 |     |                       |  |  +-- [262] f_pinky.01.L_294
   |                 |     |                       |  |     +-- [263] MCH-f_pinky.02_drv.L_293
   |                 |     |                       |  |        +-- [264] f_pinky.02.L_292
   |                 |     |                       |  |           +-- [265] MCH-f_pinky.03_drv.L_290
   |                 |     |                       |  |           |  +-- [266] f_pinky.03.L_289
   |                 |     |                       |  |           |     +-- [267] f_pinky.01.L.001_287
   |                 |     |                       |  |           |     +-- [268] MCH-f_pinky.03.L_288
   |                 |     |                       |  |           +-- [269] MCH-f_pinky.02.L_291
   |                 |     |                       |  +-- [270] MCH-f_pinky.01.L_296
   |                 |     |                       +-- [271] palm.L_298
   |                 |     +-- [272] ORG-shoulder.R_436
   |                 |     |  +-- [273] ORG-upper_arm.R_322
   |                 |     |  |  +-- [274] ORG-forearm.R_316
   |                 |     |  |  |  +-- [275] ORG-hand.R_309
   |                 |     |  |  |  |  +-- [276] MCH-hand_tweak.R_308
   |                 |     |  |  |  |     +-- [277] hand_tweak.R_307
   |                 |     |  |  |  +-- [278] MCH-forearm_tweak.R_311
   |                 |     |  |  |  |  +-- [279] forearm_tweak.R_310
   |                 |     |  |  |  +-- [280] MCH-forearm_tweak.R.001_313
   |                 |     |  |  |  |  +-- [281] forearm_tweak.R.001_312
   |                 |     |  |  |  +-- [282] MCH-forearm_tweak.R.002_315
   |                 |     |  |  |     +-- [283] forearm_tweak.R.002_314
   |                 |     |  |  +-- [284] MCH-upper_arm_parent_widget.R_317
   |                 |     |  |  +-- [285] MCH-upper_arm_tweak.R.001_319
   |                 |     |  |  |  +-- [286] upper_arm_tweak.R.001_318
   |                 |     |  |  +-- [287] MCH-upper_arm_tweak.R.002_321
   |                 |     |  |     +-- [288] upper_arm_tweak.R.002_320
   |                 |     |  +-- [289] DEF-shoulder.R_323
   |                 |     |  +-- [290] upper_arm_parent.R_324
   |                 |     |  +-- [291] MCH-upper_arm_parent.R_332
   |                 |     |  |  +-- [292] upper_arm_fk.R_328
   |                 |     |  |  |  +-- [293] forearm_fk.R_327
   |                 |     |  |  |     +-- [294] MCH-hand_fk.R_326
   |                 |     |  |  |        +-- [295] hand_fk.R_325
   |                 |     |  |  +-- [296] MCH-upper_arm_ik_swing.R_331
   |                 |     |  |     +-- [297] upper_arm_ik.R_330
   |                 |     |  |        +-- [298] MCH-forearm_ik.R_329
   |                 |     |  +-- [299] MCH-upper_arm_tweak.R_334
   |                 |     |  |  +-- [300] upper_arm_tweak.R_333
   |                 |     |  +-- [301] DEF-upper_arm.R_435
   |                 |     |     +-- [302] DEF-upper_arm.R.001_434
   |                 |     |        +-- [303] DEF-upper_arm.R.002_433
   |                 |     |           +-- [304] DEF-forearm.R_432
   |                 |     |              +-- [305] DEF-forearm.R.001_431
   |                 |     |                 +-- [306] DEF-forearm.R.002_430
   |                 |     |                    +-- [307] DEF-hand.R_429
   |                 |     |                       +-- [308] ORG-palm.01.R_370
   |                 |     |                       |  +-- [309] ORG-f_index.01.R_337
   |                 |     |                       |  |  +-- [310] ORG-f_index.02.R_336
   |                 |     |                       |  |     +-- [311] ORG-f_index.03.R_335
   |                 |     |                       |  +-- [312] ORG-thumb.01.R_340
   |                 |     |                       |  |  +-- [313] ORG-thumb.02.R_339
   |                 |     |                       |  |     +-- [314] ORG-thumb.03.R_338
   |                 |     |                       |  +-- [315] DEF-f_index.01.R_343
   |                 |     |                       |  |  +-- [316] DEF-f_index.02.R_342
   |                 |     |                       |  |     +-- [317] DEF-f_index.03.R_341
   |                 |     |                       |  +-- [318] f_index.01_master.R_344
   |                 |     |                       |  +-- [319] DEF-thumb.01.R_347
   |                 |     |                       |  |  +-- [320] DEF-thumb.02.R_346
   |                 |     |                       |  |     +-- [321] DEF-thumb.03.R_345
   |                 |     |                       |  +-- [322] thumb.01_master.R_348
   |                 |     |                       |  +-- [323] DEF-palm.01.R_349
   |                 |     |                       |  +-- [324] MCH-f_index.01_drv.R_358
   |                 |     |                       |  |  +-- [325] f_index.01.R_357
   |                 |     |                       |  |     +-- [326] MCH-f_index.02_drv.R_356
   |                 |     |                       |  |        +-- [327] f_index.02.R_355
   |                 |     |                       |  |           +-- [328] MCH-f_index.03_drv.R_353
   |                 |     |                       |  |           |  +-- [329] f_index.03.R_352
   |                 |     |                       |  |           |     +-- [330] f_index.01.R.001_350
   |                 |     |                       |  |           |     +-- [331] MCH-f_index.03.R_351
   |                 |     |                       |  |           +-- [332] MCH-f_index.02.R_354
   |                 |     |                       |  +-- [333] MCH-f_index.01.R_359
   |                 |     |                       |  +-- [334] MCH-thumb.01_drv.R_368
   |                 |     |                       |  |  +-- [335] thumb.01.R_367
   |                 |     |                       |  |     +-- [336] MCH-thumb.02_drv.R_366
   |                 |     |                       |  |        +-- [337] thumb.02.R_365
   |                 |     |                       |  |           +-- [338] MCH-thumb.03_drv.R_363
   |                 |     |                       |  |           |  +-- [339] thumb.03.R_362
   |                 |     |                       |  |           |     +-- [340] thumb.01.R.001_360
   |                 |     |                       |  |           |     +-- [341] MCH-thumb.03.R_361
   |                 |     |                       |  |           +-- [342] MCH-thumb.02.R_364
   |                 |     |                       |  +-- [343] MCH-thumb.01.R_369
   |                 |     |                       +-- [344] ORG-palm.02.R_389
   |                 |     |                       |  +-- [345] ORG-f_middle.01.R_373
   |                 |     |                       |  |  +-- [346] ORG-f_middle.02.R_372
   |                 |     |                       |  |     +-- [347] ORG-f_middle.03.R_371
   |                 |     |                       |  +-- [348] DEF-f_middle.01.R_376
   |                 |     |                       |  |  +-- [349] DEF-f_middle.02.R_375
   |                 |     |                       |  |     +-- [350] DEF-f_middle.03.R_374
   |                 |     |                       |  +-- [351] f_middle.01_master.R_377
   |                 |     |                       |  +-- [352] DEF-palm.02.R_378
   |                 |     |                       |  +-- [353] MCH-f_middle.01_drv.R_387
   |                 |     |                       |  |  +-- [354] f_middle.01.R_386
   |                 |     |                       |  |     +-- [355] MCH-f_middle.02_drv.R_385
   |                 |     |                       |  |        +-- [356] f_middle.02.R_384
   |                 |     |                       |  |           +-- [357] MCH-f_middle.03_drv.R_382
   |                 |     |                       |  |           |  +-- [358] f_middle.03.R_381
   |                 |     |                       |  |           |     +-- [359] f_middle.01.R.001_379
   |                 |     |                       |  |           |     +-- [360] MCH-f_middle.03.R_380
   |                 |     |                       |  |           +-- [361] MCH-f_middle.02.R_383
   |                 |     |                       |  +-- [362] MCH-f_middle.01.R_388
   |                 |     |                       +-- [363] ORG-palm.03.R_408
   |                 |     |                       |  +-- [364] ORG-f_ring.01.R_392
   |                 |     |                       |  |  +-- [365] ORG-f_ring.02.R_391
   |                 |     |                       |  |     +-- [366] ORG-f_ring.03.R_390
   |                 |     |                       |  +-- [367] DEF-f_ring.01.R_395
   |                 |     |                       |  |  +-- [368] DEF-f_ring.02.R_394
   |                 |     |                       |  |     +-- [369] DEF-f_ring.03.R_393
   |                 |     |                       |  +-- [370] f_ring.01_master.R_396
   |                 |     |                       |  +-- [371] DEF-palm.03.R_397
   |                 |     |                       |  +-- [372] MCH-f_ring.01_drv.R_406
   |                 |     |                       |  |  +-- [373] f_ring.01.R_405
   |                 |     |                       |  |     +-- [374] MCH-f_ring.02_drv.R_404
   |                 |     |                       |  |        +-- [375] f_ring.02.R_403
   |                 |     |                       |  |           +-- [376] MCH-f_ring.03_drv.R_401
   |                 |     |                       |  |           |  +-- [377] f_ring.03.R_400
   |                 |     |                       |  |           |     +-- [378] f_ring.01.R.001_398
   |                 |     |                       |  |           |     +-- [379] MCH-f_ring.03.R_399
   |                 |     |                       |  |           +-- [380] MCH-f_ring.02.R_402
   |                 |     |                       |  +-- [381] MCH-f_ring.01.R_407
   |                 |     |                       +-- [382] ORG-palm.04.R_427
   |                 |     |                       |  +-- [383] ORG-f_pinky.01.R_411
   |                 |     |                       |  |  +-- [384] ORG-f_pinky.02.R_410
   |                 |     |                       |  |     +-- [385] ORG-f_pinky.03.R_409
   |                 |     |                       |  +-- [386] DEF-f_pinky.01.R_414
   |                 |     |                       |  |  +-- [387] DEF-f_pinky.02.R_413
   |                 |     |                       |  |     +-- [388] DEF-f_pinky.03.R_412
   |                 |     |                       |  +-- [389] f_pinky.01_master.R_415
   |                 |     |                       |  +-- [390] DEF-palm.04.R_416
   |                 |     |                       |  +-- [391] MCH-f_pinky.01_drv.R_425
   |                 |     |                       |  |  +-- [392] f_pinky.01.R_424
   |                 |     |                       |  |     +-- [393] MCH-f_pinky.02_drv.R_423
   |                 |     |                       |  |        +-- [394] f_pinky.02.R_422
   |                 |     |                       |  |           +-- [395] MCH-f_pinky.03_drv.R_420
   |                 |     |                       |  |           |  +-- [396] f_pinky.03.R_419
   |                 |     |                       |  |           |     +-- [397] f_pinky.01.R.001_417
   |                 |     |                       |  |           |     +-- [398] MCH-f_pinky.03.R_418
   |                 |     |                       |  |           +-- [399] MCH-f_pinky.02.R_421
   |                 |     |                       |  +-- [400] MCH-f_pinky.01.R_426
   |                 |     |                       +-- [401] palm.R_428
   |                 |     +-- [402] ORG-breast.L_438
   |                 |     |  +-- [403] DEF-breast.L_437
   |                 |     +-- [404] ORG-breast.R_440
   |                 |     |  +-- [405] DEF-breast.R_439
   |                 |     +-- [406] breast.L_441
   |                 |     +-- [407] breast.R_442
   |                 |     +-- [408] shoulder.L_443
   |                 |     +-- [409] shoulder.R_444
   |                 +-- [410] MCH-WGT-chest_447
   +-- [411] MCH-hand_ik.parent.L_456
   |  +-- [412] hand_ik.L_455
   |     +-- [413] MCH-upper_arm_ik_target.L_454
   +-- [414] MCH-upper_arm_ik_target.parent.L_458
   |  +-- [415] upper_arm_ik_target.L_457
   +-- [416] MCH-hand_ik.parent.R_461
   |  +-- [417] hand_ik.R_460
   |     +-- [418] MCH-upper_arm_ik_target.R_459
   +-- [419] MCH-upper_arm_ik_target.parent.R_463
   |  +-- [420] upper_arm_ik_target.R_462
   +-- [421] MCH-foot_ik.parent.L_475
   |  +-- [422] foot_ik.L_474
   |     +-- [423] foot_spin_ik.L_473
   |        +-- [424] foot_heel_ik.L_464
   |        +-- [425] MCH-heel.02_rock2.L_472
   |           +-- [426] MCH-heel.02_rock1.L_471
   |              +-- [427] MCH-heel.02_roll2.L_470
   |                 +-- [428] MCH-heel.02_roll1.L_469
   |                    +-- [429] MCH-foot_roll.L_468
   |                       +-- [430] MCH-thigh_ik_target.L_467
   |                          +-- [431] MCH-toe_ik_parent.L_466
   |                             +-- [432] toe_ik.L_465
   +-- [433] MCH-thigh_ik_target.parent.L_477
   |  +-- [434] thigh_ik_target.L_476
   +-- [435] MCH-foot_ik.parent.R_489
   |  +-- [436] foot_ik.R_488
   |     +-- [437] foot_spin_ik.R_487
   |        +-- [438] foot_heel_ik.R_478
   |        +-- [439] MCH-heel.02_rock2.R_486
   |           +-- [440] MCH-heel.02_rock1.R_485
   |              +-- [441] MCH-heel.02_roll2.R_484
   |                 +-- [442] MCH-heel.02_roll1.R_483
   |                    +-- [443] MCH-foot_roll.R_482
   |                       +-- [444] MCH-thigh_ik_target.R_481
   |                          +-- [445] MCH-toe_ik_parent.R_480
   |                             +-- [446] toe_ik.R_479
   +-- [447] MCH-thigh_ik_target.parent.R_491
      +-- [448] thigh_ik_target.R_490
```

| Index | Bone | Parent | Bind world position |
|---:|---|---|---|
| 5 | GLTF_created_0_rootJoint | GLTF_created_0 | [0, 0, 0] |
| 15 | root_69 | GLTF_created_0_rootJoint | [0, 0, 0] |
| 16 | DEF-spine_64 | root_69 | [-1.556025, 1.066307, 0.014303] |
| 17 | DEF-spine.001_63 | DEF-spine_64 | [-1.556025, 1.160849, 0.022523] |
| 18 | DEF-spine.002_62 | DEF-spine.001_63 | [-1.556025, 1.271148, 0.032113] |
| 19 | DEF-spine.003_61 | DEF-spine.002_62 | [-1.556025, 1.397204, 0.043074] |
| 20 | DEF-spine.004_60 | DEF-spine.003_61 | [-1.556025, 1.539017, 0.055404] |
| 21 | DEF-spine.005_59 | DEF-spine.004_60 | [-1.556025, 1.574731, 0.047295] |
| 22 | DEF-spine.006_58 | DEF-spine.005_59 | [-1.556025, 1.610446, 0.039186] |
| 23 | VIS_upper_arm_ik_pole.L_65 | root_69 | [-1.922724, 1.30014, 0.057054] |
| 24 | VIS_upper_arm_ik_pole.R_66 | root_69 | [-1.189327, 1.30014, 0.056233] |
| 25 | VIS_thigh_ik_pole.L_67 | root_69 | [-1.708427, 0.583825, 0.004144] |
| 26 | VIS_thigh_ik_pole.R_68 | root_69 | [-1.403624, 0.583825, 0.004069] |
| 27 | MCH-torso.parent_453 | GLTF_created_0_rootJoint | [-1.556025, 1.113577, 0.018413] |
| 28 | torso_452 | MCH-torso.parent_453 | [-1.556025, 1.113577, 0.018413] |
| 29 | hips_70 | torso_452 | [-1.556025, 1.271148, 0.032113] |
| 30 | chest_71 | torso_452 | [-1.556025, 1.271148, 0.032113] |
| 31 | MCH-spine.001_162 | torso_452 | [-1.556025, 1.271148, 0.032113] |
| 32 | spine_fk.001_161 | MCH-spine.001_162 | [-1.556025, 1.271148, 0.032113] |
| 33 | MCH-spine_160 | spine_fk.001_161 | [-1.556025, 1.160849, 0.022523] |
| 34 | spine_fk_159 | MCH-spine_160 | [-1.556025, 1.160849, 0.022523] |
| 35 | tweak_spine_155 | spine_fk_159 | [-1.556025, 1.066307, 0.014303] |
| 36 | ORG-spine_154 | tweak_spine_155 | [-1.556025, 1.066307, 0.014303] |
| 37 | ORG-pelvis.L_73 | ORG-spine_154 | [-1.556025, 1.066307, 0.014303] |
| 38 | DEF-pelvis.L_72 | ORG-pelvis.L_73 | [-1.556025, 1.066307, 0.014303] |
| 39 | ORG-pelvis.R_75 | ORG-spine_154 | [-1.556025, 1.066307, 0.014303] |
| 40 | DEF-pelvis.R_74 | ORG-pelvis.R_75 | [-1.556026, 1.066307, 0.014303] |
| 41 | ORG-thigh.L_93 | ORG-spine_154 | [-1.640187, 1.01374, 0.01572] |
| 42 | ORG-shin.L_87 | ORG-thigh.L_93 | [-1.708427, 0.583825, 0.004144] |
| 43 | ORG-foot.L_80 | ORG-shin.L_87 | [-1.761022, 0.124281, 0.048107] |
| 44 | ORG-toe.L_76 | ORG-foot.L_80 | [-1.757395, 0.034852, -0.083052] |
| 45 | ORG-heel.02.L_77 | ORG-foot.L_80 | [-1.717877, 0, 0.125945] |
| 46 | MCH-foot_tweak.L_79 | ORG-foot.L_80 | [-1.761022, 0.124281, 0.048107] |
| 47 | foot_tweak.L_78 | MCH-foot_tweak.L_79 | [-1.761022, 0.124281, 0.048107] |
| 48 | MCH-shin_tweak.L_82 | ORG-shin.L_87 | [-1.708427, 0.583825, 0.004143] |
| 49 | shin_tweak.L_81 | MCH-shin_tweak.L_82 | [-1.708427, 0.583825, 0.004143] |
| 50 | MCH-shin_tweak.L.001_84 | ORG-shin.L_87 | [-1.725959, 0.430644, 0.018798] |
| 51 | shin_tweak.L.001_83 | MCH-shin_tweak.L.001_84 | [-1.725959, 0.430644, 0.018798] |
| 52 | MCH-shin_tweak.L.002_86 | ORG-shin.L_87 | [-1.74349, 0.277462, 0.033452] |
| 53 | shin_tweak.L.002_85 | MCH-shin_tweak.L.002_86 | [-1.74349, 0.277462, 0.033452] |
| 54 | MCH-thigh_parent_widget.L_88 | ORG-thigh.L_93 | [-1.640188, 1.01374, 0.01572] |
| 55 | MCH-thigh_tweak.L.001_90 | ORG-thigh.L_93 | [-1.662934, 0.870435, 0.011861] |
| 56 | thigh_tweak.L.001_89 | MCH-thigh_tweak.L.001_90 | [-1.662934, 0.870435, 0.011861] |
| 57 | MCH-thigh_tweak.L.002_92 | ORG-thigh.L_93 | [-1.685681, 0.72713, 0.008002] |
| 58 | thigh_tweak.L.002_91 | MCH-thigh_tweak.L.002_92 | [-1.685681, 0.72713, 0.008002] |
| 59 | ORG-thigh.R_111 | ORG-spine_154 | [-1.471863, 1.01374, 0.017672] |
| 60 | ORG-shin.R_105 | ORG-thigh.R_111 | [-1.403624, 0.583825, 0.004069] |
| 61 | ORG-foot.R_98 | ORG-shin.R_105 | [-1.35103, 0.124279, 0.046369] |
| 62 | ORG-toe.R_94 | ORG-foot.R_98 | [-1.354658, 0.034851, -0.083176] |
| 63 | ORG-heel.02.R_95 | ORG-foot.R_98 | [1.717874, 0, 0.125947] |
| 64 | MCH-foot_tweak.R_97 | ORG-foot.R_98 | [-1.35103, 0.124279, 0.046369] |
| 65 | foot_tweak.R_96 | MCH-foot_tweak.R_97 | [-1.35103, 0.124279, 0.046369] |
| 66 | MCH-shin_tweak.R_100 | ORG-shin.R_105 | [-1.403624, 0.583825, 0.004069] |
| 67 | shin_tweak.R_99 | MCH-shin_tweak.R_100 | [-1.403624, 0.583824, 0.004069] |
| 68 | MCH-shin_tweak.R.001_102 | ORG-shin.R_105 | [-1.386093, 0.430643, 0.018169] |
| 69 | shin_tweak.R.001_101 | MCH-shin_tweak.R.001_102 | [-1.386093, 0.430643, 0.018169] |
| 70 | MCH-shin_tweak.R.002_104 | ORG-shin.R_105 | [-1.368562, 0.277461, 0.032269] |
| 71 | shin_tweak.R.002_103 | MCH-shin_tweak.R.002_104 | [-1.368562, 0.277461, 0.032269] |
| 72 | MCH-thigh_parent_widget.R_106 | ORG-thigh.R_111 | [-1.471863, 1.01374, 0.017672] |
| 73 | MCH-thigh_tweak.R.001_108 | ORG-thigh.R_111 | [-1.449117, 0.870435, 0.013137] |
| 74 | thigh_tweak.R.001_107 | MCH-thigh_tweak.R.001_108 | [-1.449117, 0.870435, 0.013137] |
| 75 | MCH-thigh_tweak.R.002_110 | ORG-thigh.R_111 | [-1.426371, 0.72713, 0.008603] |
| 76 | thigh_tweak.R.002_109 | MCH-thigh_tweak.R.002_110 | [-1.42637, 0.72713, 0.008603] |
| 77 | thigh_parent.L_112 | ORG-spine_154 | [-1.640187, 1.01374, 0.01572] |
| 78 | MCH-thigh_parent.L_122 | ORG-spine_154 | [-1.640187, 1.01374, 0.01572] |
| 79 | thigh_fk.L_118 | MCH-thigh_parent.L_122 | [-1.640187, 1.01374, 0.01572] |
| 80 | shin_fk.L_117 | thigh_fk.L_118 | [-1.708427, 0.583825, 0.004143] |
| 81 | MCH-foot_fk.L_116 | shin_fk.L_117 | [-1.761021, 0.124281, 0.048107] |
| 82 | foot_fk.L_115 | MCH-foot_fk.L_116 | [-1.761021, 0.124281, 0.048107] |
| 83 | MCH-toe_fk.L_114 | foot_fk.L_115 | [-1.757394, 0.034852, -0.083052] |
| 84 | toe_fk.L_113 | MCH-toe_fk.L_114 | [-1.757394, 0.034852, -0.083052] |
| 85 | MCH-thigh_ik_swing.L_121 | MCH-thigh_parent.L_122 | [-1.640187, 1.01374, 0.01572] |
| 86 | thigh_ik.L_120 | MCH-thigh_ik_swing.L_121 | [-1.640188, 1.01374, 0.01572] |
| 87 | MCH-shin_ik.L_119 | thigh_ik.L_120 | [-1.708427, 0.583825, 0.004144] |
| 88 | MCH-thigh_tweak.L_124 | ORG-spine_154 | [-1.640187, 1.01374, 0.01572] |
| 89 | thigh_tweak.L_123 | MCH-thigh_tweak.L_124 | [-1.640188, 1.01374, 0.01572] |
| 90 | DEF-thigh.L_132 | ORG-spine_154 | [-1.640187, 1.01374, 0.01572] |
| 91 | DEF-thigh.L.001_131 | DEF-thigh.L_132 | [-1.662934, 0.870435, 0.011861] |
| 92 | DEF-thigh.L.002_130 | DEF-thigh.L.001_131 | [-1.685681, 0.72713, 0.008002] |
| 93 | DEF-shin.L_129 | DEF-thigh.L.002_130 | [-1.708427, 0.583825, 0.004144] |
| 94 | DEF-shin.L.001_128 | DEF-shin.L_129 | [-1.725959, 0.430644, 0.018798] |
| 95 | DEF-shin.L.002_127 | DEF-shin.L.001_128 | [-1.743491, 0.277462, 0.033452] |
| 96 | DEF-foot.L_126 | DEF-shin.L.002_127 | [-1.761022, 0.124281, 0.048107] |
| 97 | DEF-toe.L_125 | DEF-foot.L_126 | [-1.757395, 0.034852, -0.083052] |
| 98 | thigh_parent.R_133 | ORG-spine_154 | [-1.471863, 1.01374, 0.017672] |
| 99 | MCH-thigh_parent.R_143 | ORG-spine_154 | [-1.471863, 1.01374, 0.017672] |
| 100 | thigh_fk.R_139 | MCH-thigh_parent.R_143 | [-1.471863, 1.01374, 0.017672] |
| 101 | shin_fk.R_138 | thigh_fk.R_139 | [-1.403624, 0.583825, 0.004069] |
| 102 | MCH-foot_fk.R_137 | shin_fk.R_138 | [-1.35103, 0.124279, 0.04637] |
| 103 | foot_fk.R_136 | MCH-foot_fk.R_137 | [-1.35103, 0.124279, 0.04637] |
| 104 | MCH-toe_fk.R_135 | foot_fk.R_136 | [-1.354657, 0.034851, -0.083176] |
| 105 | toe_fk.R_134 | MCH-toe_fk.R_135 | [-1.354657, 0.034851, -0.083176] |
| 106 | MCH-thigh_ik_swing.R_142 | MCH-thigh_parent.R_143 | [-1.471863, 1.01374, 0.017672] |
| 107 | thigh_ik.R_141 | MCH-thigh_ik_swing.R_142 | [-1.471863, 1.01374, 0.017672] |
| 108 | MCH-shin_ik.R_140 | thigh_ik.R_141 | [-1.403624, 0.583825, 0.004069] |
| 109 | MCH-thigh_tweak.R_145 | ORG-spine_154 | [-1.471863, 1.01374, 0.017672] |
| 110 | thigh_tweak.R_144 | MCH-thigh_tweak.R_145 | [-1.471863, 1.01374, 0.017672] |
| 111 | DEF-thigh.R_153 | ORG-spine_154 | [-1.471863, 1.01374, 0.017672] |
| 112 | DEF-thigh.R.001_152 | DEF-thigh.R_153 | [-1.449117, 0.870435, 0.013137] |
| 113 | DEF-thigh.R.002_151 | DEF-thigh.R.001_152 | [-1.426371, 0.72713, 0.008603] |
| 114 | DEF-shin.R_150 | DEF-thigh.R.002_151 | [-1.403625, 0.583825, 0.004069] |
| 115 | DEF-shin.R.001_149 | DEF-shin.R_150 | [-1.386093, 0.430643, 0.018169] |
| 116 | DEF-shin.R.002_148 | DEF-shin.R.001_149 | [-1.368562, 0.277461, 0.032269] |
| 117 | DEF-foot.R_147 | DEF-shin.R.002_148 | [-1.351031, 0.124279, 0.046369] |
| 118 | DEF-toe.R_146 | DEF-foot.R_147 | [-1.354658, 0.034851, -0.083176] |
| 119 | tweak_spine.001_157 | spine_fk_159 | [-1.556025, 1.160849, 0.022523] |
| 120 | ORG-spine.001_156 | tweak_spine.001_157 | [-1.556025, 1.160849, 0.022523] |
| 121 | MCH-WGT-hips_158 | spine_fk_159 | [-1.556025, 1.066307, 0.014303] |
| 122 | MCH-spine.002_451 | torso_452 | [-1.556025, 1.271148, 0.032113] |
| 123 | spine_fk.002_450 | MCH-spine.002_451 | [-1.556025, 1.271148, 0.032113] |
| 124 | MCH-pivot_165 | spine_fk.002_450 | [-1.556025, 1.271148, 0.032113] |
| 125 | tweak_spine.002_164 | MCH-pivot_165 | [-1.556025, 1.271148, 0.032113] |
| 126 | ORG-spine.002_163 | tweak_spine.002_164 | [-1.556025, 1.271147, 0.032113] |
| 127 | MCH-spine.003_449 | spine_fk.002_450 | [-1.556025, 1.397204, 0.043073] |
| 128 | spine_fk.003_448 | MCH-spine.003_449 | [-1.556025, 1.397204, 0.043073] |
| 129 | ORG-spine.004_168 | spine_fk.003_448 | [-1.556025, 1.539017, 0.055403] |
| 130 | ORG-spine.005_167 | ORG-spine.004_168 | [-1.556025, 1.574732, 0.047295] |
| 131 | ORG-spine.006_166 | ORG-spine.005_167 | [-1.556025, 1.610447, 0.039186] |
| 132 | MCH-ROT-neck_176 | spine_fk.003_448 | [-1.556025, 1.539017, 0.055403] |
| 133 | neck_175 | MCH-ROT-neck_176 | [-1.556026, 1.539017, 0.055403] |
| 134 | MCH-ROT-head_170 | neck_175 | [-1.556026, 1.610447, 0.039186] |
| 135 | head_169 | MCH-ROT-head_170 | [-1.556026, 1.610447, 0.039186] |
| 136 | tweak_spine.004_171 | neck_175 | [-1.556026, 1.539017, 0.055403] |
| 137 | MCH-STR-neck_174 | neck_175 | [-1.556026, 1.539017, 0.055403] |
| 138 | MCH-spine.005_173 | MCH-STR-neck_174 | [-1.556026, 1.574732, 0.047295] |
| 139 | tweak_spine.005_172 | MCH-spine.005_173 | [-1.556026, 1.574732, 0.047295] |
| 140 | tweak_spine.003_446 | spine_fk.003_448 | [-1.556025, 1.397204, 0.043073] |
| 141 | ORG-spine.003_445 | tweak_spine.003_446 | [-1.556025, 1.397204, 0.043073] |
| 142 | ORG-shoulder.L_306 | ORG-spine.003_445 | [-1.617105, 1.515006, 0.05516] |
| 143 | ORG-upper_arm.L_192 | ORG-shoulder.L_306 | [-1.739657, 1.467281, 0.054672] |
| 144 | ORG-forearm.L_186 | ORG-upper_arm.L_192 | [-1.922724, 1.300139, 0.057053] |
| 145 | ORG-hand.L_179 | ORG-forearm.L_186 | [-2.150068, 1.087196, 0.008795] |
| 146 | MCH-hand_tweak.L_178 | ORG-hand.L_179 | [-2.150068, 1.087196, 0.008795] |
| 147 | hand_tweak.L_177 | MCH-hand_tweak.L_178 | [-2.150068, 1.087196, 0.008795] |
| 148 | MCH-forearm_tweak.L_181 | ORG-forearm.L_186 | [-1.922724, 1.300139, 0.057053] |
| 149 | forearm_tweak.L_180 | MCH-forearm_tweak.L_181 | [-1.922724, 1.300139, 0.057053] |
| 150 | MCH-forearm_tweak.L.001_183 | ORG-forearm.L_186 | [-1.998505, 1.229158, 0.040967] |
| 151 | forearm_tweak.L.001_182 | MCH-forearm_tweak.L.001_183 | [-1.998505, 1.229158, 0.040967] |
| 152 | MCH-forearm_tweak.L.002_185 | ORG-forearm.L_186 | [-2.074287, 1.158177, 0.024881] |
| 153 | forearm_tweak.L.002_184 | MCH-forearm_tweak.L.002_185 | [-2.074287, 1.158177, 0.024881] |
| 154 | MCH-upper_arm_parent_widget.L_187 | ORG-upper_arm.L_192 | [-1.739657, 1.467281, 0.054672] |
| 155 | MCH-upper_arm_tweak.L.001_189 | ORG-upper_arm.L_192 | [-1.800679, 1.411567, 0.055466] |
| 156 | upper_arm_tweak.L.001_188 | MCH-upper_arm_tweak.L.001_189 | [-1.800679, 1.411567, 0.055466] |
| 157 | MCH-upper_arm_tweak.L.002_191 | ORG-upper_arm.L_192 | [-1.861702, 1.355853, 0.05626] |
| 158 | upper_arm_tweak.L.002_190 | MCH-upper_arm_tweak.L.002_191 | [-1.861702, 1.355853, 0.05626] |
| 159 | DEF-shoulder.L_193 | ORG-shoulder.L_306 | [-1.617105, 1.515005, 0.05516] |
| 160 | upper_arm_parent.L_194 | ORG-shoulder.L_306 | [-1.739657, 1.467281, 0.054672] |
| 161 | MCH-upper_arm_parent.L_202 | ORG-shoulder.L_306 | [-1.739657, 1.467281, 0.054672] |
| 162 | upper_arm_fk.L_198 | MCH-upper_arm_parent.L_202 | [-1.739657, 1.467281, 0.054672] |
| 163 | forearm_fk.L_197 | upper_arm_fk.L_198 | [-1.922724, 1.300139, 0.057053] |
| 164 | MCH-hand_fk.L_196 | forearm_fk.L_197 | [-2.150068, 1.087196, 0.008795] |
| 165 | hand_fk.L_195 | MCH-hand_fk.L_196 | [-2.150068, 1.087196, 0.008795] |
| 166 | MCH-upper_arm_ik_swing.L_201 | MCH-upper_arm_parent.L_202 | [-1.739657, 1.467281, 0.054672] |
| 167 | upper_arm_ik.L_200 | MCH-upper_arm_ik_swing.L_201 | [-1.739657, 1.467281, 0.054673] |
| 168 | MCH-forearm_ik.L_199 | upper_arm_ik.L_200 | [-1.922724, 1.300139, 0.057053] |
| 169 | MCH-upper_arm_tweak.L_204 | ORG-shoulder.L_306 | [-1.739657, 1.467281, 0.054672] |
| 170 | upper_arm_tweak.L_203 | MCH-upper_arm_tweak.L_204 | [-1.739657, 1.467281, 0.054673] |
| 171 | DEF-upper_arm.L_305 | ORG-shoulder.L_306 | [-1.739657, 1.467281, 0.054672] |
| 172 | DEF-upper_arm.L.001_304 | DEF-upper_arm.L_305 | [-1.800679, 1.411567, 0.055466] |
| 173 | DEF-upper_arm.L.002_303 | DEF-upper_arm.L.001_304 | [-1.861702, 1.355853, 0.05626] |
| 174 | DEF-forearm.L_302 | DEF-upper_arm.L.002_303 | [-1.922724, 1.300139, 0.057053] |
| 175 | DEF-forearm.L.001_301 | DEF-forearm.L_302 | [-1.998505, 1.229158, 0.040967] |
| 176 | DEF-forearm.L.002_300 | DEF-forearm.L.001_301 | [-2.074287, 1.158177, 0.024881] |
| 177 | DEF-hand.L_299 | DEF-forearm.L.002_300 | [-2.150068, 1.087196, 0.008795] |
| 178 | ORG-palm.01.L_240 | DEF-hand.L_299 | [-2.161373, 1.075235, 0.000578] |
| 179 | ORG-f_index.01.L_207 | ORG-palm.01.L_240 | [-2.195288, 1.039352, -0.024071] |
| 180 | ORG-f_index.02.L_206 | ORG-f_index.01.L_207 | [-2.214816, 1.013687, -0.031456] |
| 181 | ORG-f_index.03.L_205 | ORG-f_index.02.L_206 | [-2.230499, 0.989399, -0.038248] |
| 182 | ORG-thumb.01.L_210 | ORG-palm.01.L_240 | [-2.154074, 1.069801, -0.022279] |
| 183 | ORG-thumb.02.L_209 | ORG-thumb.01.L_210 | [-2.157279, 1.055886, -0.047139] |
| 184 | ORG-thumb.03.L_208 | ORG-thumb.02.L_209 | [-2.168583, 1.03491, -0.071879] |
| 185 | DEF-f_index.01.L_213 | ORG-palm.01.L_240 | [-2.195288, 1.039352, -0.024071] |
| 186 | DEF-f_index.02.L_212 | DEF-f_index.01.L_213 | [-2.214816, 1.013687, -0.031456] |
| 187 | DEF-f_index.03.L_211 | DEF-f_index.02.L_212 | [-2.230499, 0.989399, -0.038248] |
| 188 | f_index.01_master.L_214 | ORG-palm.01.L_240 | [-2.195288, 1.039352, -0.024071] |
| 189 | DEF-thumb.01.L_217 | ORG-palm.01.L_240 | [-2.154074, 1.069801, -0.022279] |
| 190 | DEF-thumb.02.L_216 | DEF-thumb.01.L_217 | [-2.157279, 1.055886, -0.047139] |
| 191 | DEF-thumb.03.L_215 | DEF-thumb.02.L_216 | [-2.168583, 1.03491, -0.071879] |
| 192 | thumb.01_master.L_218 | ORG-palm.01.L_240 | [-2.154074, 1.069801, -0.022279] |
| 193 | DEF-palm.01.L_219 | ORG-palm.01.L_240 | [-2.161373, 1.075235, 0.000578] |
| 194 | MCH-f_index.01_drv.L_228 | ORG-palm.01.L_240 | [-2.195288, 1.039352, -0.024071] |
| 195 | f_index.01.L_227 | MCH-f_index.01_drv.L_228 | [-2.195288, 1.039352, -0.024071] |
| 196 | MCH-f_index.02_drv.L_226 | f_index.01.L_227 | [-2.214816, 1.013687, -0.031456] |
| 197 | f_index.02.L_225 | MCH-f_index.02_drv.L_226 | [-2.214816, 1.013687, -0.031456] |
| 198 | MCH-f_index.03_drv.L_223 | f_index.02.L_225 | [-2.230498, 0.989399, -0.038248] |
| 199 | f_index.03.L_222 | MCH-f_index.03_drv.L_223 | [-2.230498, 0.989399, -0.038248] |
| 200 | f_index.01.L.001_220 | f_index.03.L_222 | [-2.247722, 0.97142, -0.043667] |
| 201 | MCH-f_index.03.L_221 | f_index.03.L_222 | [-2.230498, 0.989399, -0.038248] |
| 202 | MCH-f_index.02.L_224 | f_index.02.L_225 | [-2.214816, 1.013687, -0.031456] |
| 203 | MCH-f_index.01.L_229 | ORG-palm.01.L_240 | [-2.195288, 1.039352, -0.024071] |
| 204 | MCH-thumb.01_drv.L_238 | ORG-palm.01.L_240 | [-2.154074, 1.069801, -0.022279] |
| 205 | thumb.01.L_237 | MCH-thumb.01_drv.L_238 | [-2.154074, 1.069801, -0.022279] |
| 206 | MCH-thumb.02_drv.L_236 | thumb.01.L_237 | [-2.157279, 1.055886, -0.047138] |
| 207 | thumb.02.L_235 | MCH-thumb.02_drv.L_236 | [-2.157279, 1.055886, -0.047139] |
| 208 | MCH-thumb.03_drv.L_233 | thumb.02.L_235 | [-2.168583, 1.03491, -0.071879] |
| 209 | thumb.03.L_232 | MCH-thumb.03_drv.L_233 | [-2.168583, 1.03491, -0.071879] |
| 210 | thumb.01.L.001_230 | thumb.03.L_232 | [-2.180838, 1.017468, -0.094374] |
| 211 | MCH-thumb.03.L_231 | thumb.03.L_232 | [-2.168583, 1.03491, -0.071879] |
| 212 | MCH-thumb.02.L_234 | thumb.02.L_235 | [-2.157279, 1.055886, -0.047138] |
| 213 | MCH-thumb.01.L_239 | ORG-palm.01.L_240 | [-2.154074, 1.069801, -0.022279] |
| 214 | ORG-palm.02.L_259 | DEF-hand.L_299 | [-2.161211, 1.074566, 0.007726] |
| 215 | ORG-f_middle.01.L_243 | ORG-palm.02.L_259 | [-2.19464, 1.036678, 0.004518] |
| 216 | ORG-f_middle.02.L_242 | ORG-f_middle.01.L_243 | [-2.218206, 1.010902, 0.002944] |
| 217 | ORG-f_middle.03.L_241 | ORG-f_middle.02.L_242 | [-2.236376, 0.982456, 0.00092] |
| 218 | DEF-f_middle.01.L_246 | ORG-palm.02.L_259 | [-2.19464, 1.036678, 0.004518] |
| 219 | DEF-f_middle.02.L_245 | DEF-f_middle.01.L_246 | [-2.218206, 1.010902, 0.002944] |
| 220 | DEF-f_middle.03.L_244 | DEF-f_middle.02.L_245 | [-2.236376, 0.982456, 0.00092] |
| 221 | f_middle.01_master.L_247 | ORG-palm.02.L_259 | [-2.19464, 1.036678, 0.004518] |
| 222 | DEF-palm.02.L_248 | ORG-palm.02.L_259 | [-2.161211, 1.074566, 0.007725] |
| 223 | MCH-f_middle.01_drv.L_257 | ORG-palm.02.L_259 | [-2.19464, 1.036678, 0.004518] |
| 224 | f_middle.01.L_256 | MCH-f_middle.01_drv.L_257 | [-2.194641, 1.036678, 0.004518] |
| 225 | MCH-f_middle.02_drv.L_255 | f_middle.01.L_256 | [-2.218206, 1.010902, 0.002944] |
| 226 | f_middle.02.L_254 | MCH-f_middle.02_drv.L_255 | [-2.218206, 1.010902, 0.002944] |
| 227 | MCH-f_middle.03_drv.L_252 | f_middle.02.L_254 | [-2.236376, 0.982457, 0.00092] |
| 228 | f_middle.03.L_251 | MCH-f_middle.03_drv.L_252 | [-2.236376, 0.982456, 0.00092] |
| 229 | f_middle.01.L.001_249 | f_middle.03.L_251 | [-2.254636, 0.959129, -0.000618] |
| 230 | MCH-f_middle.03.L_250 | f_middle.03.L_251 | [-2.236376, 0.982456, 0.00092] |
| 231 | MCH-f_middle.02.L_253 | f_middle.02.L_254 | [-2.218206, 1.010902, 0.002944] |
| 232 | MCH-f_middle.01.L_258 | ORG-palm.02.L_259 | [-2.19464, 1.036678, 0.004518] |
| 233 | ORG-palm.03.L_278 | DEF-hand.L_299 | [-2.160633, 1.074312, 0.01367] |
| 234 | ORG-f_ring.01.L_262 | ORG-palm.03.L_278 | [-2.192326, 1.035659, 0.028297] |
| 235 | ORG-f_ring.02.L_261 | ORG-f_ring.01.L_262 | [-2.210884, 1.011917, 0.034216] |
| 236 | ORG-f_ring.03.L_260 | ORG-f_ring.02.L_261 | [-2.227503, 0.987785, 0.039815] |
| 237 | DEF-f_ring.01.L_265 | ORG-palm.03.L_278 | [-2.192326, 1.035659, 0.028297] |
| 238 | DEF-f_ring.02.L_264 | DEF-f_ring.01.L_265 | [-2.210884, 1.011917, 0.034216] |
| 239 | DEF-f_ring.03.L_263 | DEF-f_ring.02.L_264 | [-2.227503, 0.987785, 0.039815] |
| 240 | f_ring.01_master.L_266 | ORG-palm.03.L_278 | [-2.192326, 1.035659, 0.028297] |
| 241 | DEF-palm.03.L_267 | ORG-palm.03.L_278 | [-2.160632, 1.074312, 0.01367] |
| 242 | MCH-f_ring.01_drv.L_276 | ORG-palm.03.L_278 | [-2.192326, 1.035659, 0.028297] |
| 243 | f_ring.01.L_275 | MCH-f_ring.01_drv.L_276 | [-2.192326, 1.035659, 0.028297] |
| 244 | MCH-f_ring.02_drv.L_274 | f_ring.01.L_275 | [-2.210883, 1.011917, 0.034216] |
| 245 | f_ring.02.L_273 | MCH-f_ring.02_drv.L_274 | [-2.210884, 1.011917, 0.034216] |
| 246 | MCH-f_ring.03_drv.L_271 | f_ring.02.L_273 | [-2.227503, 0.987785, 0.039815] |
| 247 | f_ring.03.L_270 | MCH-f_ring.03_drv.L_271 | [-2.227503, 0.987785, 0.039815] |
| 248 | f_ring.01.L.001_268 | f_ring.03.L_270 | [-2.243127, 0.967314, 0.044849] |
| 249 | MCH-f_ring.03.L_269 | f_ring.03.L_270 | [-2.227503, 0.987785, 0.039815] |
| 250 | MCH-f_ring.02.L_272 | f_ring.02.L_273 | [-2.210883, 1.011917, 0.034216] |
| 251 | MCH-f_ring.01.L_277 | ORG-palm.03.L_278 | [-2.192326, 1.035659, 0.028297] |
| 252 | ORG-palm.04.L_297 | DEF-hand.L_299 | [-2.157284, 1.076124, 0.018972] |
| 253 | ORG-f_pinky.01.L_281 | ORG-palm.04.L_297 | [-2.17893, 1.042911, 0.049505] |
| 254 | ORG-f_pinky.02.L_280 | ORG-f_pinky.01.L_281 | [-2.196352, 1.022204, 0.059737] |
| 255 | ORG-f_pinky.03.L_279 | ORG-f_pinky.02.L_280 | [-2.20955, 1.003762, 0.068164] |
| 256 | DEF-f_pinky.01.L_284 | ORG-palm.04.L_297 | [-2.17893, 1.042911, 0.049505] |
| 257 | DEF-f_pinky.02.L_283 | DEF-f_pinky.01.L_284 | [-2.196352, 1.022204, 0.059737] |
| 258 | DEF-f_pinky.03.L_282 | DEF-f_pinky.02.L_283 | [-2.20955, 1.003762, 0.068164] |
| 259 | f_pinky.01_master.L_285 | ORG-palm.04.L_297 | [-2.17893, 1.042911, 0.049505] |
| 260 | DEF-palm.04.L_286 | ORG-palm.04.L_297 | [-2.157283, 1.076124, 0.018973] |
| 261 | MCH-f_pinky.01_drv.L_295 | ORG-palm.04.L_297 | [-2.17893, 1.042911, 0.049505] |
| 262 | f_pinky.01.L_294 | MCH-f_pinky.01_drv.L_295 | [-2.17893, 1.042911, 0.049505] |
| 263 | MCH-f_pinky.02_drv.L_293 | f_pinky.01.L_294 | [-2.196352, 1.022204, 0.059737] |
| 264 | f_pinky.02.L_292 | MCH-f_pinky.02_drv.L_293 | [-2.196352, 1.022204, 0.059737] |
| 265 | MCH-f_pinky.03_drv.L_290 | f_pinky.02.L_292 | [-2.20955, 1.003762, 0.068164] |
| 266 | f_pinky.03.L_289 | MCH-f_pinky.03_drv.L_290 | [-2.20955, 1.003762, 0.068164] |
| 267 | f_pinky.01.L.001_287 | f_pinky.03.L_289 | [-2.221929, 0.988846, 0.075481] |
| 268 | MCH-f_pinky.03.L_288 | f_pinky.03.L_289 | [-2.20955, 1.003762, 0.068164] |
| 269 | MCH-f_pinky.02.L_291 | f_pinky.02.L_292 | [-2.196352, 1.022204, 0.059737] |
| 270 | MCH-f_pinky.01.L_296 | ORG-palm.04.L_297 | [-2.17893, 1.042911, 0.049505] |
| 271 | palm.L_298 | DEF-hand.L_299 | [-2.157284, 1.076124, 0.018972] |
| 272 | ORG-shoulder.R_436 | ORG-spine.003_445 | [-1.494945, 1.515006, 0.055647] |
| 273 | ORG-upper_arm.R_322 | ORG-shoulder.R_436 | [-1.372394, 1.467281, 0.056134] |
| 274 | ORG-forearm.R_316 | ORG-upper_arm.R_322 | [-1.189327, 1.30014, 0.056233] |
| 275 | ORG-hand.R_309 | ORG-forearm.R_316 | [-0.961983, 1.087196, 0.007975] |
| 276 | MCH-hand_tweak.R_308 | ORG-hand.R_309 | [-0.961983, 1.087196, 0.007975] |
| 277 | hand_tweak.R_307 | MCH-hand_tweak.R_308 | [-0.961983, 1.087196, 0.007975] |
| 278 | MCH-forearm_tweak.R_311 | ORG-forearm.R_316 | [-1.189327, 1.30014, 0.056233] |
| 279 | forearm_tweak.R_310 | MCH-forearm_tweak.R_311 | [-1.189327, 1.30014, 0.056233] |
| 280 | MCH-forearm_tweak.R.001_313 | ORG-forearm.R_316 | [-1.113545, 1.229159, 0.040147] |
| 281 | forearm_tweak.R.001_312 | MCH-forearm_tweak.R.001_313 | [-1.113545, 1.229159, 0.040147] |
| 282 | MCH-forearm_tweak.R.002_315 | ORG-forearm.R_316 | [-1.037764, 1.158178, 0.024061] |
| 283 | forearm_tweak.R.002_314 | MCH-forearm_tweak.R.002_315 | [-1.037764, 1.158177, 0.024061] |
| 284 | MCH-upper_arm_parent_widget.R_317 | ORG-upper_arm.R_322 | [-1.372394, 1.467281, 0.056134] |
| 285 | MCH-upper_arm_tweak.R.001_319 | ORG-upper_arm.R_322 | [-1.311372, 1.411568, 0.056167] |
| 286 | upper_arm_tweak.R.001_318 | MCH-upper_arm_tweak.R.001_319 | [-1.311372, 1.411568, 0.056167] |
| 287 | MCH-upper_arm_tweak.R.002_321 | ORG-upper_arm.R_322 | [-1.250349, 1.355854, 0.0562] |
| 288 | upper_arm_tweak.R.002_320 | MCH-upper_arm_tweak.R.002_321 | [-1.250349, 1.355854, 0.0562] |
| 289 | DEF-shoulder.R_323 | ORG-shoulder.R_436 | [-1.494945, 1.515006, 0.055647] |
| 290 | upper_arm_parent.R_324 | ORG-shoulder.R_436 | [-1.372394, 1.467281, 0.056134] |
| 291 | MCH-upper_arm_parent.R_332 | ORG-shoulder.R_436 | [-1.372394, 1.467281, 0.056134] |
| 292 | upper_arm_fk.R_328 | MCH-upper_arm_parent.R_332 | [-1.372394, 1.467281, 0.056134] |
| 293 | forearm_fk.R_327 | upper_arm_fk.R_328 | [-1.189327, 1.30014, 0.056233] |
| 294 | MCH-hand_fk.R_326 | forearm_fk.R_327 | [-0.961982, 1.087197, 0.007975] |
| 295 | hand_fk.R_325 | MCH-hand_fk.R_326 | [-0.961982, 1.087196, 0.007975] |
| 296 | MCH-upper_arm_ik_swing.R_331 | MCH-upper_arm_parent.R_332 | [-1.372394, 1.467281, 0.056134] |
| 297 | upper_arm_ik.R_330 | MCH-upper_arm_ik_swing.R_331 | [-1.372394, 1.467281, 0.056134] |
| 298 | MCH-forearm_ik.R_329 | upper_arm_ik.R_330 | [-1.189327, 1.30014, 0.056233] |
| 299 | MCH-upper_arm_tweak.R_334 | ORG-shoulder.R_436 | [-1.372394, 1.467281, 0.056134] |
| 300 | upper_arm_tweak.R_333 | MCH-upper_arm_tweak.R_334 | [-1.372394, 1.467281, 0.056134] |
| 301 | DEF-upper_arm.R_435 | ORG-shoulder.R_436 | [-1.372394, 1.467281, 0.056134] |
| 302 | DEF-upper_arm.R.001_434 | DEF-upper_arm.R_435 | [-1.311372, 1.411568, 0.056167] |
| 303 | DEF-upper_arm.R.002_433 | DEF-upper_arm.R.001_434 | [-1.250349, 1.355854, 0.0562] |
| 304 | DEF-forearm.R_432 | DEF-upper_arm.R.002_433 | [-1.189327, 1.30014, 0.056233] |
| 305 | DEF-forearm.R.001_431 | DEF-forearm.R_432 | [-1.113545, 1.229159, 0.040147] |
| 306 | DEF-forearm.R.002_430 | DEF-forearm.R.001_431 | [-1.037764, 1.158177, 0.024061] |
| 307 | DEF-hand.R_429 | DEF-forearm.R.002_430 | [-0.961982, 1.087196, 0.007975] |
| 308 | ORG-palm.01.R_370 | DEF-hand.R_429 | [-0.950825, 1.075751, 0.000327] |
| 309 | ORG-f_index.01.R_337 | ORG-palm.01.R_370 | [-0.917351, 1.041416, -0.022618] |
| 310 | ORG-f_index.02.R_336 | ORG-f_index.01.R_337 | [-0.898715, 1.015345, -0.031642] |
| 311 | ORG-f_index.03.R_335 | ORG-f_index.02.R_336 | [-0.881924, 0.990729, -0.040067] |
| 312 | ORG-thumb.01.R_340 | ORG-palm.01.R_370 | [-0.957293, 1.068872, -0.023401] |
| 313 | ORG-thumb.02.R_339 | ORG-thumb.01.R_340 | [-0.953541, 1.054213, -0.048501] |
| 314 | ORG-thumb.03.R_338 | ORG-thumb.02.R_339 | [-0.942444, 1.033817, -0.073075] |
| 315 | DEF-f_index.01.R_343 | ORG-palm.01.R_370 | [-0.917351, 1.041416, -0.022618] |
| 316 | DEF-f_index.02.R_342 | DEF-f_index.01.R_343 | [-0.898715, 1.015345, -0.031642] |
| 317 | DEF-f_index.03.R_341 | DEF-f_index.02.R_342 | [-0.881924, 0.990729, -0.040067] |
| 318 | f_index.01_master.R_344 | ORG-palm.01.R_370 | [-0.917351, 1.041416, -0.022618] |
| 319 | DEF-thumb.01.R_347 | ORG-palm.01.R_370 | [-0.957293, 1.068872, -0.023401] |
| 320 | DEF-thumb.02.R_346 | DEF-thumb.01.R_347 | [-0.953541, 1.054213, -0.048501] |
| 321 | DEF-thumb.03.R_345 | DEF-thumb.02.R_346 | [-0.942444, 1.033817, -0.073075] |
| 322 | thumb.01_master.R_348 | ORG-palm.01.R_370 | [-0.957293, 1.068872, -0.023401] |
| 323 | DEF-palm.01.R_349 | ORG-palm.01.R_370 | [-0.950825, 1.075751, 0.000327] |
| 324 | MCH-f_index.01_drv.R_358 | ORG-palm.01.R_370 | [-0.917351, 1.041416, -0.022618] |
| 325 | f_index.01.R_357 | MCH-f_index.01_drv.R_358 | [-0.917351, 1.041416, -0.022618] |
| 326 | MCH-f_index.02_drv.R_356 | f_index.01.R_357 | [-0.898715, 1.015345, -0.031642] |
| 327 | f_index.02.R_355 | MCH-f_index.02_drv.R_356 | [-0.898715, 1.015345, -0.031642] |
| 328 | MCH-f_index.03_drv.R_353 | f_index.02.R_355 | [-0.881924, 0.99073, -0.040067] |
| 329 | f_index.03.R_352 | MCH-f_index.03_drv.R_353 | [-0.881924, 0.99073, -0.040067] |
| 330 | f_index.01.R.001_350 | f_index.03.R_352 | [-0.866439, 0.969992, -0.047317] |
| 331 | MCH-f_index.03.R_351 | f_index.03.R_352 | [-0.881924, 0.99073, -0.040067] |
| 332 | MCH-f_index.02.R_354 | f_index.02.R_355 | [-0.898715, 1.015345, -0.031642] |
| 333 | MCH-f_index.01.R_359 | ORG-palm.01.R_370 | [-0.917351, 1.041416, -0.022618] |
| 334 | MCH-thumb.01_drv.R_368 | ORG-palm.01.R_370 | [-0.957293, 1.068872, -0.023401] |
| 335 | thumb.01.R_367 | MCH-thumb.01_drv.R_368 | [-0.957293, 1.068872, -0.023401] |
| 336 | MCH-thumb.02_drv.R_366 | thumb.01.R_367 | [-0.953541, 1.054213, -0.048501] |
| 337 | thumb.02.R_365 | MCH-thumb.02_drv.R_366 | [-0.953541, 1.054213, -0.048501] |
| 338 | MCH-thumb.03_drv.R_363 | thumb.02.R_365 | [-0.942444, 1.033817, -0.073075] |
| 339 | thumb.03.R_362 | MCH-thumb.03_drv.R_363 | [-0.942444, 1.033817, -0.073075] |
| 340 | thumb.01.R.001_360 | thumb.03.R_362 | [-0.927587, 1.018547, -0.089724] |
| 341 | MCH-thumb.03.R_361 | thumb.03.R_362 | [-0.942444, 1.033817, -0.073075] |
| 342 | MCH-thumb.02.R_364 | thumb.02.R_365 | [-0.953541, 1.054213, -0.048501] |
| 343 | MCH-thumb.01.R_369 | ORG-palm.01.R_370 | [-0.957293, 1.068872, -0.023401] |
| 344 | ORG-palm.02.R_389 | DEF-hand.R_429 | [-0.950757, 1.074468, 0.007219] |
| 345 | ORG-f_middle.01.R_373 | ORG-palm.02.R_389 | [-0.917082, 1.036285, 0.004953] |
| 346 | ORG-f_middle.02.R_372 | ORG-f_middle.01.R_373 | [-0.893924, 1.00977, 0.003619] |
| 347 | ORG-f_middle.03.R_371 | ORG-f_middle.02.R_372 | [-0.875101, 0.981592, 0.002005] |
| 348 | DEF-f_middle.01.R_376 | ORG-palm.02.R_389 | [-0.917082, 1.036285, 0.004953] |
| 349 | DEF-f_middle.02.R_375 | DEF-f_middle.01.R_376 | [-0.893924, 1.00977, 0.003619] |
| 350 | DEF-f_middle.03.R_374 | DEF-f_middle.02.R_375 | [-0.875101, 0.981592, 0.002005] |
| 351 | f_middle.01_master.R_377 | ORG-palm.02.R_389 | [-0.917082, 1.036285, 0.004953] |
| 352 | DEF-palm.02.R_378 | ORG-palm.02.R_389 | [-0.950757, 1.074468, 0.007219] |
| 353 | MCH-f_middle.01_drv.R_387 | ORG-palm.02.R_389 | [-0.917082, 1.036285, 0.004953] |
| 354 | f_middle.01.R_386 | MCH-f_middle.01_drv.R_387 | [-0.917082, 1.036285, 0.004953] |
| 355 | MCH-f_middle.02_drv.R_385 | f_middle.01.R_386 | [-0.893923, 1.00977, 0.003619] |
| 356 | f_middle.02.R_384 | MCH-f_middle.02_drv.R_385 | [-0.893923, 1.00977, 0.003619] |
| 357 | MCH-f_middle.03_drv.R_382 | f_middle.02.R_384 | [-0.875101, 0.981592, 0.002005] |
| 358 | f_middle.03.R_381 | MCH-f_middle.03_drv.R_382 | [-0.875101, 0.981592, 0.002005] |
| 359 | f_middle.01.R.001_379 | f_middle.03.R_381 | [-0.858857, 0.95847, 0.000706] |
| 360 | MCH-f_middle.03.R_380 | f_middle.03.R_381 | [-0.875101, 0.981592, 0.002005] |
| 361 | MCH-f_middle.02.R_383 | f_middle.02.R_384 | [-0.893923, 1.00977, 0.003619] |
| 362 | MCH-f_middle.01.R_388 | ORG-palm.02.R_389 | [-0.917082, 1.036285, 0.004953] |
| 363 | ORG-palm.03.R_408 | DEF-hand.R_429 | [-0.950849, 1.073618, 0.013366] |
| 364 | ORG-f_ring.01.R_392 | ORG-palm.03.R_408 | [-0.917447, 1.032885, 0.029541] |
| 365 | ORG-f_ring.02.R_391 | ORG-f_ring.01.R_392 | [-0.898984, 1.009715, 0.034344] |
| 366 | ORG-f_ring.03.R_390 | ORG-f_ring.02.R_391 | [-0.882956, 0.986088, 0.038791] |
| 367 | DEF-f_ring.01.R_395 | ORG-palm.03.R_408 | [-0.917447, 1.032885, 0.029541] |
| 368 | DEF-f_ring.02.R_394 | DEF-f_ring.01.R_395 | [-0.898984, 1.009715, 0.034344] |
| 369 | DEF-f_ring.03.R_393 | DEF-f_ring.02.R_394 | [-0.882956, 0.986088, 0.038791] |
| 370 | f_ring.01_master.R_396 | ORG-palm.03.R_408 | [-0.917447, 1.032885, 0.029541] |
| 371 | DEF-palm.03.R_397 | ORG-palm.03.R_408 | [-0.950849, 1.073619, 0.013366] |
| 372 | MCH-f_ring.01_drv.R_406 | ORG-palm.03.R_408 | [-0.917447, 1.032885, 0.029541] |
| 373 | f_ring.01.R_405 | MCH-f_ring.01_drv.R_406 | [-0.917448, 1.032885, 0.029541] |
| 374 | MCH-f_ring.02_drv.R_404 | f_ring.01.R_405 | [-0.898984, 1.009715, 0.034344] |
| 375 | f_ring.02.R_403 | MCH-f_ring.02_drv.R_404 | [-0.898984, 1.009715, 0.034344] |
| 376 | MCH-f_ring.03_drv.R_401 | f_ring.02.R_403 | [-0.882956, 0.986088, 0.038791] |
| 377 | f_ring.03.R_400 | MCH-f_ring.03_drv.R_401 | [-0.882956, 0.986088, 0.038791] |
| 378 | f_ring.01.R.001_398 | f_ring.03.R_400 | [-0.869014, 0.967656, 0.042488] |
| 379 | MCH-f_ring.03.R_399 | f_ring.03.R_400 | [-0.882956, 0.986088, 0.038791] |
| 380 | MCH-f_ring.02.R_402 | f_ring.02.R_403 | [-0.898984, 1.009715, 0.034344] |
| 381 | MCH-f_ring.01.R_407 | ORG-palm.03.R_408 | [-0.917447, 1.032885, 0.029541] |
| 382 | ORG-palm.04.R_427 | DEF-hand.R_429 | [-0.954656, 1.075865, 0.018257] |
| 383 | ORG-f_pinky.01.R_411 | ORG-palm.04.R_427 | [-0.932675, 1.041872, 0.049104] |
| 384 | ORG-f_pinky.02.R_410 | ORG-f_pinky.01.R_411 | [-0.915724, 1.022696, 0.059766] |
| 385 | ORG-f_pinky.03.R_409 | ORG-f_pinky.02.R_410 | [-0.902667, 1.004048, 0.069052] |
| 386 | DEF-f_pinky.01.R_414 | ORG-palm.04.R_427 | [-0.932675, 1.041872, 0.049104] |
| 387 | DEF-f_pinky.02.R_413 | DEF-f_pinky.01.R_414 | [-0.915724, 1.022696, 0.059766] |
| 388 | DEF-f_pinky.03.R_412 | DEF-f_pinky.02.R_413 | [-0.902667, 1.004048, 0.069052] |
| 389 | f_pinky.01_master.R_415 | ORG-palm.04.R_427 | [-0.932675, 1.041872, 0.049104] |
| 390 | DEF-palm.04.R_416 | ORG-palm.04.R_427 | [-0.954656, 1.075865, 0.018257] |
| 391 | MCH-f_pinky.01_drv.R_425 | ORG-palm.04.R_427 | [-0.932675, 1.041872, 0.049104] |
| 392 | f_pinky.01.R_424 | MCH-f_pinky.01_drv.R_425 | [-0.932675, 1.041872, 0.049104] |
| 393 | MCH-f_pinky.02_drv.R_423 | f_pinky.01.R_424 | [-0.915724, 1.022696, 0.059766] |
| 394 | f_pinky.02.R_422 | MCH-f_pinky.02_drv.R_423 | [-0.915724, 1.022696, 0.059766] |
| 395 | MCH-f_pinky.03_drv.R_420 | f_pinky.02.R_422 | [-0.902667, 1.004048, 0.069052] |
| 396 | f_pinky.03.R_419 | MCH-f_pinky.03_drv.R_420 | [-0.902667, 1.004048, 0.069052] |
| 397 | f_pinky.01.R.001_417 | f_pinky.03.R_419 | [-0.890101, 0.989591, 0.077023] |
| 398 | MCH-f_pinky.03.R_418 | f_pinky.03.R_419 | [-0.902667, 1.004047, 0.069052] |
| 399 | MCH-f_pinky.02.R_421 | f_pinky.02.R_422 | [-0.915724, 1.022696, 0.059766] |
| 400 | MCH-f_pinky.01.R_426 | ORG-palm.04.R_427 | [-0.932675, 1.041872, 0.049104] |
| 401 | palm.R_428 | DEF-hand.R_429 | [-0.954656, 1.075865, 0.018257] |
| 402 | ORG-breast.L_438 | ORG-spine.003_445 | [-1.657476, 1.76584, 0.059056] |
| 403 | DEF-breast.L_437 | ORG-breast.L_438 | [-1.657476, 1.765841, 0.059056] |
| 404 | ORG-breast.R_440 | ORG-spine.003_445 | [-1.427464, 1.76584, 0.059056] |
| 405 | DEF-breast.R_439 | ORG-breast.R_440 | [-1.427464, 1.765841, 0.059056] |
| 406 | breast.L_441 | ORG-spine.003_445 | [-1.657476, 1.76584, 0.059056] |
| 407 | breast.R_442 | ORG-spine.003_445 | [-1.427464, 1.76584, 0.059056] |
| 408 | shoulder.L_443 | ORG-spine.003_445 | [-1.617105, 1.515006, 0.05516] |
| 409 | shoulder.R_444 | ORG-spine.003_445 | [-1.494945, 1.515006, 0.055647] |
| 410 | MCH-WGT-chest_447 | spine_fk.003_448 | [-1.556025, 1.397204, 0.043073] |
| 411 | MCH-hand_ik.parent.L_456 | GLTF_created_0_rootJoint | [-2.150068, 1.087196, 0.008795] |
| 412 | hand_ik.L_455 | MCH-hand_ik.parent.L_456 | [-2.150068, 1.087196, 0.008795] |
| 413 | MCH-upper_arm_ik_target.L_454 | hand_ik.L_455 | [-2.150068, 1.087196, 0.008795] |
| 414 | MCH-upper_arm_ik_target.parent.L_458 | GLTF_created_0_rootJoint | [-1.98584, 1.300976, 0.614747] |
| 415 | upper_arm_ik_target.L_457 | MCH-upper_arm_ik_target.parent.L_458 | [-1.98584, 1.300976, 0.614747] |
| 416 | MCH-hand_ik.parent.R_461 | GLTF_created_0_rootJoint | [-0.961982, 1.087196, 0.007975] |
| 417 | hand_ik.R_460 | MCH-hand_ik.parent.R_461 | [-0.961982, 1.087196, 0.007975] |
| 418 | MCH-upper_arm_ik_target.R_459 | hand_ik.R_460 | [-0.961982, 1.087197, 0.007975] |
| 419 | MCH-upper_arm_ik_target.parent.R_463 | GLTF_created_0_rootJoint | [-1.122792, 1.301347, 0.613721] |
| 420 | upper_arm_ik_target.R_462 | MCH-upper_arm_ik_target.parent.R_463 | [-1.122792, 1.301347, 0.613721] |
| 421 | MCH-foot_ik.parent.L_475 | GLTF_created_0_rootJoint | [-1.761021, 0.124281, 0.048107] |
| 422 | foot_ik.L_474 | MCH-foot_ik.parent.L_475 | [-1.761021, 0.124281, 0.048107] |
| 423 | foot_spin_ik.L_473 | foot_ik.L_474 | [-1.757394, 0.034852, -0.083051] |
| 424 | foot_heel_ik.L_464 | foot_spin_ik.L_473 | [-1.761021, 0.124281, 0.048107] |
| 425 | MCH-heel.02_rock2.L_472 | foot_spin_ik.L_473 | [-1.717876, 0, 0.125945] |
| 426 | MCH-heel.02_rock1.L_471 | MCH-heel.02_rock2.L_472 | [-1.810194, 0, 0.125945] |
| 427 | MCH-heel.02_roll2.L_470 | MCH-heel.02_rock1.L_471 | [-1.764035, 0, 0.125945] |
| 428 | MCH-heel.02_roll1.L_469 | MCH-heel.02_roll2.L_470 | [-1.757394, 0.034852, -0.083051] |
| 429 | MCH-foot_roll.L_468 | MCH-heel.02_roll1.L_469 | [-1.761021, 0.124281, 0.048107] |
| 430 | MCH-thigh_ik_target.L_467 | MCH-foot_roll.L_468 | [-1.761021, 0.124281, 0.048107] |
| 431 | MCH-toe_ik_parent.L_466 | MCH-thigh_ik_target.L_467 | [-1.757394, 0.034852, -0.083051] |
| 432 | toe_ik.L_465 | MCH-toe_ik_parent.L_466 | [-1.757394, 0.034852, -0.083051] |
| 433 | MCH-thigh_ik_target.parent.L_477 | GLTF_created_0_rootJoint | [-2.012149, 0.594308, -0.841095] |
| 434 | thigh_ik_target.L_476 | MCH-thigh_ik_target.parent.L_477 | [-2.012149, 0.594308, -0.841095] |
| 435 | MCH-foot_ik.parent.R_489 | GLTF_created_0_rootJoint | [-1.35103, 0.12428, 0.04637] |
| 436 | foot_ik.R_488 | MCH-foot_ik.parent.R_489 | [-1.35103, 0.12428, 0.04637] |
| 437 | foot_spin_ik.R_487 | foot_ik.R_488 | [-1.354657, 0.034851, -0.083176] |
| 438 | foot_heel_ik.R_478 | foot_spin_ik.R_487 | [-1.35103, 0.12428, 0.04637] |
| 439 | MCH-heel.02_rock2.R_486 | foot_spin_ik.R_487 | [1.717877, 0, 0.125944] |
| 440 | MCH-heel.02_rock1.R_485 | MCH-heel.02_rock2.R_486 | [1.810194, 0, 0.125944] |
| 441 | MCH-heel.02_roll2.R_484 | MCH-heel.02_rock1.R_485 | [1.764035, 0, 0.125944] |
| 442 | MCH-heel.02_roll1.R_483 | MCH-heel.02_roll2.R_484 | [-1.354657, 0.034851, -0.083176] |
| 443 | MCH-foot_roll.R_482 | MCH-heel.02_roll1.R_483 | [-1.35103, 0.12428, 0.04637] |
| 444 | MCH-thigh_ik_target.R_481 | MCH-foot_roll.R_482 | [-1.35103, 0.12428, 0.04637] |
| 445 | MCH-toe_ik_parent.R_480 | MCH-thigh_ik_target.R_481 | [-1.354657, 0.034851, -0.083176] |
| 446 | toe_ik.R_479 | MCH-toe_ik_parent.R_480 | [-1.354657, 0.034851, -0.083176] |
| 447 | MCH-thigh_ik_target.parent.R_491 | GLTF_created_0_rootJoint | [-1.102735, 0.597403, -0.842007] |
| 448 | thigh_ik_target.R_490 | MCH-thigh_ik_target.parent.R_491 | [-1.102735, 0.597403, -0.842007] |

### Feet and ground references

- Geometry min Y: 0.01209.
- Bone [43] ORG-foot.L_80: bind world position [-1.761022, 0.124281, 0.048107].
- Bone [44] ORG-toe.L_76: bind world position [-1.757395, 0.034852, -0.083052].
- Bone [46] MCH-foot_tweak.L_79: bind world position [-1.761022, 0.124281, 0.048107].
- Bone [47] foot_tweak.L_78: bind world position [-1.761022, 0.124281, 0.048107].
- Bone [61] ORG-foot.R_98: bind world position [-1.35103, 0.124279, 0.046369].
- Bone [62] ORG-toe.R_94: bind world position [-1.354658, 0.034851, -0.083176].
- Bone [64] MCH-foot_tweak.R_97: bind world position [-1.35103, 0.124279, 0.046369].
- Bone [65] foot_tweak.R_96: bind world position [-1.35103, 0.124279, 0.046369].
- Bone [81] MCH-foot_fk.L_116: bind world position [-1.761021, 0.124281, 0.048107].
- Bone [82] foot_fk.L_115: bind world position [-1.761021, 0.124281, 0.048107].
- Bone [83] MCH-toe_fk.L_114: bind world position [-1.757394, 0.034852, -0.083052].
- Bone [84] toe_fk.L_113: bind world position [-1.757394, 0.034852, -0.083052].
- Bone [96] DEF-foot.L_126: bind world position [-1.761022, 0.124281, 0.048107].
- Bone [97] DEF-toe.L_125: bind world position [-1.757395, 0.034852, -0.083052].
- Bone [102] MCH-foot_fk.R_137: bind world position [-1.35103, 0.124279, 0.04637].
- Bone [103] foot_fk.R_136: bind world position [-1.35103, 0.124279, 0.04637].
- Bone [104] MCH-toe_fk.R_135: bind world position [-1.354657, 0.034851, -0.083176].
- Bone [105] toe_fk.R_134: bind world position [-1.354657, 0.034851, -0.083176].
- Bone [117] DEF-foot.R_147: bind world position [-1.351031, 0.124279, 0.046369].
- Bone [118] DEF-toe.R_146: bind world position [-1.354658, 0.034851, -0.083176].
- Bone [421] MCH-foot_ik.parent.L_475: bind world position [-1.761021, 0.124281, 0.048107].
- Bone [422] foot_ik.L_474: bind world position [-1.761021, 0.124281, 0.048107].
- Bone [423] foot_spin_ik.L_473: bind world position [-1.757394, 0.034852, -0.083051].
- Bone [424] foot_heel_ik.L_464: bind world position [-1.761021, 0.124281, 0.048107].
- Bone [429] MCH-foot_roll.L_468: bind world position [-1.761021, 0.124281, 0.048107].
- Bone [431] MCH-toe_ik_parent.L_466: bind world position [-1.757394, 0.034852, -0.083051].
- Bone [432] toe_ik.L_465: bind world position [-1.757394, 0.034852, -0.083051].
- Bone [435] MCH-foot_ik.parent.R_489: bind world position [-1.35103, 0.12428, 0.04637].
- Bone [436] foot_ik.R_488: bind world position [-1.35103, 0.12428, 0.04637].
- Bone [437] foot_spin_ik.R_487: bind world position [-1.354657, 0.034851, -0.083176].
- Bone [438] foot_heel_ik.R_478: bind world position [-1.35103, 0.12428, 0.04637].
- Bone [443] MCH-foot_roll.R_482: bind world position [-1.35103, 0.12428, 0.04637].
- Bone [445] MCH-toe_ik_parent.R_480: bind world position [-1.354657, 0.034851, -0.083176].
- Bone [446] toe_ik.R_479: bind world position [-1.354657, 0.034851, -0.083176].

### Animations and tracks

#### [0] Armature.001Action.001

Duration: 3.983333 s (0 to 3.983333); 1249 tracks.

Animated bones (428): DEF-spine_64, DEF-spine.001_63, DEF-spine.002_62, DEF-spine.003_61, DEF-spine.004_60, DEF-spine.005_59, DEF-spine.006_58, VIS_upper_arm_ik_pole.L_65, VIS_upper_arm_ik_pole.R_66, VIS_thigh_ik_pole.L_67, VIS_thigh_ik_pole.R_68, torso_452, hips_70, chest_71, MCH-spine.001_162, spine_fk.001_161, MCH-spine_160, spine_fk_159, tweak_spine_155, ORG-spine_154, ORG-pelvis.L_73, DEF-pelvis.L_72, ORG-pelvis.R_75, DEF-pelvis.R_74, ORG-thigh.L_93, ORG-shin.L_87, ORG-foot.L_80, ORG-toe.L_76, ORG-heel.02.L_77, MCH-foot_tweak.L_79, foot_tweak.L_78, MCH-shin_tweak.L_82, shin_tweak.L_81, MCH-shin_tweak.L.001_84, shin_tweak.L.001_83, MCH-shin_tweak.L.002_86, shin_tweak.L.002_85, MCH-thigh_parent_widget.L_88, MCH-thigh_tweak.L.001_90, thigh_tweak.L.001_89, MCH-thigh_tweak.L.002_92, thigh_tweak.L.002_91, ORG-thigh.R_111, ORG-shin.R_105, ORG-foot.R_98, ORG-toe.R_94, ORG-heel.02.R_95, MCH-foot_tweak.R_97, foot_tweak.R_96, MCH-shin_tweak.R_100, shin_tweak.R_99, MCH-shin_tweak.R.001_102, shin_tweak.R.001_101, MCH-shin_tweak.R.002_104, shin_tweak.R.002_103, MCH-thigh_parent_widget.R_106, MCH-thigh_tweak.R.001_108, thigh_tweak.R.001_107, MCH-thigh_tweak.R.002_110, thigh_tweak.R.002_109, thigh_parent.L_112, MCH-thigh_parent.L_122, thigh_fk.L_118, shin_fk.L_117, MCH-foot_fk.L_116, foot_fk.L_115, MCH-toe_fk.L_114, toe_fk.L_113, MCH-thigh_ik_swing.L_121, thigh_ik.L_120, MCH-shin_ik.L_119, MCH-thigh_tweak.L_124, thigh_tweak.L_123, DEF-thigh.L_132, DEF-thigh.L.001_131, DEF-thigh.L.002_130, DEF-shin.L_129, DEF-shin.L.001_128, DEF-shin.L.002_127, DEF-foot.L_126, DEF-toe.L_125, thigh_parent.R_133, MCH-thigh_parent.R_143, thigh_fk.R_139, shin_fk.R_138, MCH-foot_fk.R_137, foot_fk.R_136, MCH-toe_fk.R_135, toe_fk.R_134, MCH-thigh_ik_swing.R_142, thigh_ik.R_141, MCH-shin_ik.R_140, MCH-thigh_tweak.R_145, thigh_tweak.R_144, DEF-thigh.R_153, DEF-thigh.R.001_152, DEF-thigh.R.002_151, DEF-shin.R_150, DEF-shin.R.001_149, DEF-shin.R.002_148, DEF-foot.R_147, DEF-toe.R_146, tweak_spine.001_157, ORG-spine.001_156, MCH-WGT-hips_158, MCH-spine.002_451, spine_fk.002_450, MCH-pivot_165, tweak_spine.002_164, ORG-spine.002_163, MCH-spine.003_449, spine_fk.003_448, ORG-spine.004_168, ORG-spine.005_167, ORG-spine.006_166, MCH-ROT-neck_176, neck_175, MCH-ROT-head_170, head_169, tweak_spine.004_171, MCH-STR-neck_174, MCH-spine.005_173, tweak_spine.005_172, tweak_spine.003_446, ORG-spine.003_445, ORG-shoulder.L_306, ORG-upper_arm.L_192, ORG-forearm.L_186, ORG-hand.L_179, MCH-hand_tweak.L_178, hand_tweak.L_177, MCH-forearm_tweak.L_181, forearm_tweak.L_180, MCH-forearm_tweak.L.001_183, forearm_tweak.L.001_182, MCH-forearm_tweak.L.002_185, forearm_tweak.L.002_184, MCH-upper_arm_parent_widget.L_187, MCH-upper_arm_tweak.L.001_189, upper_arm_tweak.L.001_188, MCH-upper_arm_tweak.L.002_191, upper_arm_tweak.L.002_190, DEF-shoulder.L_193, upper_arm_parent.L_194, MCH-upper_arm_parent.L_202, upper_arm_fk.L_198, forearm_fk.L_197, MCH-hand_fk.L_196, hand_fk.L_195, MCH-upper_arm_ik_swing.L_201, upper_arm_ik.L_200, MCH-forearm_ik.L_199, MCH-upper_arm_tweak.L_204, upper_arm_tweak.L_203, DEF-upper_arm.L_305, DEF-upper_arm.L.001_304, DEF-upper_arm.L.002_303, DEF-forearm.L_302, DEF-forearm.L.001_301, DEF-forearm.L.002_300, DEF-hand.L_299, ORG-palm.01.L_240, ORG-f_index.01.L_207, ORG-f_index.02.L_206, ORG-f_index.03.L_205, ORG-thumb.01.L_210, ORG-thumb.02.L_209, ORG-thumb.03.L_208, DEF-f_index.01.L_213, DEF-f_index.02.L_212, DEF-f_index.03.L_211, f_index.01_master.L_214, DEF-thumb.01.L_217, DEF-thumb.02.L_216, DEF-thumb.03.L_215, thumb.01_master.L_218, DEF-palm.01.L_219, MCH-f_index.01_drv.L_228, f_index.01.L_227, MCH-f_index.02_drv.L_226, f_index.02.L_225, MCH-f_index.03_drv.L_223, f_index.03.L_222, f_index.01.L.001_220, MCH-f_index.03.L_221, MCH-f_index.02.L_224, MCH-f_index.01.L_229, MCH-thumb.01_drv.L_238, thumb.01.L_237, MCH-thumb.02_drv.L_236, thumb.02.L_235, MCH-thumb.03_drv.L_233, thumb.03.L_232, thumb.01.L.001_230, MCH-thumb.03.L_231, MCH-thumb.02.L_234, MCH-thumb.01.L_239, ORG-palm.02.L_259, ORG-f_middle.01.L_243, ORG-f_middle.02.L_242, ORG-f_middle.03.L_241, DEF-f_middle.01.L_246, DEF-f_middle.02.L_245, DEF-f_middle.03.L_244, f_middle.01_master.L_247, DEF-palm.02.L_248, MCH-f_middle.01_drv.L_257, f_middle.01.L_256, MCH-f_middle.02_drv.L_255, f_middle.02.L_254, MCH-f_middle.03_drv.L_252, f_middle.03.L_251, f_middle.01.L.001_249, MCH-f_middle.03.L_250, MCH-f_middle.02.L_253, MCH-f_middle.01.L_258, ORG-palm.03.L_278, ORG-f_ring.01.L_262, ORG-f_ring.02.L_261, ORG-f_ring.03.L_260, DEF-f_ring.01.L_265, DEF-f_ring.02.L_264, DEF-f_ring.03.L_263, f_ring.01_master.L_266, DEF-palm.03.L_267, MCH-f_ring.01_drv.L_276, f_ring.01.L_275, MCH-f_ring.02_drv.L_274, f_ring.02.L_273, MCH-f_ring.03_drv.L_271, f_ring.03.L_270, f_ring.01.L.001_268, MCH-f_ring.03.L_269, MCH-f_ring.02.L_272, MCH-f_ring.01.L_277, ORG-palm.04.L_297, ORG-f_pinky.01.L_281, ORG-f_pinky.02.L_280, ORG-f_pinky.03.L_279, DEF-f_pinky.01.L_284, DEF-f_pinky.02.L_283, DEF-f_pinky.03.L_282, f_pinky.01_master.L_285, DEF-palm.04.L_286, MCH-f_pinky.01_drv.L_295, f_pinky.01.L_294, MCH-f_pinky.02_drv.L_293, f_pinky.02.L_292, MCH-f_pinky.03_drv.L_290, f_pinky.03.L_289, f_pinky.01.L.001_287, MCH-f_pinky.03.L_288, MCH-f_pinky.02.L_291, MCH-f_pinky.01.L_296, palm.L_298, ORG-shoulder.R_436, ORG-upper_arm.R_322, ORG-forearm.R_316, ORG-hand.R_309, MCH-hand_tweak.R_308, hand_tweak.R_307, MCH-forearm_tweak.R_311, forearm_tweak.R_310, MCH-forearm_tweak.R.001_313, forearm_tweak.R.001_312, MCH-forearm_tweak.R.002_315, forearm_tweak.R.002_314, MCH-upper_arm_parent_widget.R_317, MCH-upper_arm_tweak.R.001_319, upper_arm_tweak.R.001_318, MCH-upper_arm_tweak.R.002_321, upper_arm_tweak.R.002_320, DEF-shoulder.R_323, upper_arm_parent.R_324, MCH-upper_arm_parent.R_332, upper_arm_fk.R_328, forearm_fk.R_327, MCH-hand_fk.R_326, hand_fk.R_325, MCH-upper_arm_ik_swing.R_331, upper_arm_ik.R_330, MCH-forearm_ik.R_329, MCH-upper_arm_tweak.R_334, upper_arm_tweak.R_333, DEF-upper_arm.R_435, DEF-upper_arm.R.001_434, DEF-upper_arm.R.002_433, DEF-forearm.R_432, DEF-forearm.R.001_431, DEF-forearm.R.002_430, DEF-hand.R_429, ORG-palm.01.R_370, ORG-f_index.01.R_337, ORG-f_index.02.R_336, ORG-f_index.03.R_335, ORG-thumb.01.R_340, ORG-thumb.02.R_339, ORG-thumb.03.R_338, DEF-f_index.01.R_343, DEF-f_index.02.R_342, DEF-f_index.03.R_341, f_index.01_master.R_344, DEF-thumb.01.R_347, DEF-thumb.02.R_346, DEF-thumb.03.R_345, thumb.01_master.R_348, DEF-palm.01.R_349, MCH-f_index.01_drv.R_358, f_index.01.R_357, MCH-f_index.02_drv.R_356, f_index.02.R_355, MCH-f_index.03_drv.R_353, f_index.03.R_352, f_index.01.R.001_350, MCH-f_index.03.R_351, MCH-f_index.02.R_354, MCH-f_index.01.R_359, MCH-thumb.01_drv.R_368, thumb.01.R_367, MCH-thumb.02_drv.R_366, thumb.02.R_365, MCH-thumb.03_drv.R_363, thumb.03.R_362, thumb.01.R.001_360, MCH-thumb.03.R_361, MCH-thumb.02.R_364, MCH-thumb.01.R_369, ORG-palm.02.R_389, ORG-f_middle.01.R_373, ORG-f_middle.02.R_372, ORG-f_middle.03.R_371, DEF-f_middle.01.R_376, DEF-f_middle.02.R_375, DEF-f_middle.03.R_374, f_middle.01_master.R_377, DEF-palm.02.R_378, MCH-f_middle.01_drv.R_387, f_middle.01.R_386, MCH-f_middle.02_drv.R_385, f_middle.02.R_384, MCH-f_middle.03_drv.R_382, f_middle.03.R_381, f_middle.01.R.001_379, MCH-f_middle.03.R_380, MCH-f_middle.02.R_383, MCH-f_middle.01.R_388, ORG-palm.03.R_408, ORG-f_ring.01.R_392, ORG-f_ring.02.R_391, ORG-f_ring.03.R_390, DEF-f_ring.01.R_395, DEF-f_ring.02.R_394, DEF-f_ring.03.R_393, f_ring.01_master.R_396, DEF-palm.03.R_397, MCH-f_ring.01_drv.R_406, f_ring.01.R_405, MCH-f_ring.02_drv.R_404, f_ring.02.R_403, MCH-f_ring.03_drv.R_401, f_ring.03.R_400, f_ring.01.R.001_398, MCH-f_ring.03.R_399, MCH-f_ring.02.R_402, MCH-f_ring.01.R_407, ORG-palm.04.R_427, ORG-f_pinky.01.R_411, ORG-f_pinky.02.R_410, ORG-f_pinky.03.R_409, DEF-f_pinky.01.R_414, DEF-f_pinky.02.R_413, DEF-f_pinky.03.R_412, f_pinky.01_master.R_415, DEF-palm.04.R_416, MCH-f_pinky.01_drv.R_425, f_pinky.01.R_424, MCH-f_pinky.02_drv.R_423, f_pinky.02.R_422, MCH-f_pinky.03_drv.R_420, f_pinky.03.R_419, f_pinky.01.R.001_417, MCH-f_pinky.03.R_418, MCH-f_pinky.02.R_421, MCH-f_pinky.01.R_426, palm.R_428, ORG-breast.L_438, DEF-breast.L_437, ORG-breast.R_440, DEF-breast.R_439, breast.L_441, breast.R_442, shoulder.L_443, shoulder.R_444, MCH-WGT-chest_447, hand_ik.L_455, MCH-upper_arm_ik_target.L_454, MCH-upper_arm_ik_target.parent.L_458, upper_arm_ik_target.L_457, hand_ik.R_460, MCH-upper_arm_ik_target.R_459, MCH-upper_arm_ik_target.parent.R_463, upper_arm_ik_target.R_462, foot_ik.L_474, foot_spin_ik.L_473, foot_heel_ik.L_464, MCH-heel.02_rock2.L_472, MCH-heel.02_rock1.L_471, MCH-heel.02_roll2.L_470, MCH-heel.02_roll1.L_469, MCH-foot_roll.L_468, MCH-thigh_ik_target.L_467, MCH-toe_ik_parent.L_466, toe_ik.L_465, MCH-thigh_ik_target.parent.L_477, thigh_ik_target.L_476, foot_ik.R_488, foot_spin_ik.R_487, foot_heel_ik.R_478, MCH-heel.02_rock2.R_486, MCH-heel.02_rock1.R_485, MCH-heel.02_roll2.R_484, MCH-heel.02_roll1.R_483, MCH-foot_roll.R_482, MCH-thigh_ik_target.R_481, MCH-toe_ik_parent.R_480, toe_ik.R_479, MCH-thigh_ik_target.parent.R_491, thigh_ik_target.R_490.

| # | Target | Bone | Path | Interpolation | Keys | Start | End |
|---:|---|:---:|---|---|---:|---:|---:|
| 0 | DEF-spine_64 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 1 | DEF-spine_64 | yes | rotation | LINEAR | 167 | 0 | 3.983333 |
| 2 | DEF-spine_64 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 3 | DEF-spine.001_63 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 4 | DEF-spine.001_63 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 5 | DEF-spine.001_63 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 6 | DEF-spine.002_62 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 7 | DEF-spine.002_62 | yes | rotation | LINEAR | 228 | 0 | 3.983333 |
| 8 | DEF-spine.002_62 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 9 | DEF-spine.003_61 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 10 | DEF-spine.003_61 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 11 | DEF-spine.003_61 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 12 | DEF-spine.004_60 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 13 | DEF-spine.004_60 | yes | rotation | LINEAR | 213 | 0 | 3.983333 |
| 14 | DEF-spine.004_60 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 15 | DEF-spine.005_59 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 16 | DEF-spine.005_59 | yes | rotation | LINEAR | 226 | 0 | 3.983333 |
| 17 | DEF-spine.005_59 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 18 | DEF-spine.006_58 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 19 | DEF-spine.006_58 | yes | rotation | LINEAR | 226 | 0 | 3.983333 |
| 20 | DEF-spine.006_58 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 21 | VIS_upper_arm_ik_pole.L_65 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 22 | VIS_upper_arm_ik_pole.L_65 | yes | rotation | LINEAR | 232 | 0 | 3.983333 |
| 23 | VIS_upper_arm_ik_pole.L_65 | yes | scale | LINEAR | 230 | 0 | 3.983333 |
| 24 | VIS_upper_arm_ik_pole.R_66 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 25 | VIS_upper_arm_ik_pole.R_66 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 26 | VIS_upper_arm_ik_pole.R_66 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 27 | VIS_thigh_ik_pole.L_67 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 28 | VIS_thigh_ik_pole.L_67 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 29 | VIS_thigh_ik_pole.L_67 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 30 | VIS_thigh_ik_pole.R_68 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 31 | VIS_thigh_ik_pole.R_68 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 32 | VIS_thigh_ik_pole.R_68 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 33 | torso_452 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 34 | torso_452 | yes | rotation | LINEAR | 159 | 0 | 3.983333 |
| 35 | torso_452 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 36 | hips_70 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 37 | hips_70 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 38 | hips_70 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 39 | chest_71 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 40 | chest_71 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 41 | chest_71 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 42 | MCH-spine.001_162 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 43 | MCH-spine.001_162 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 44 | MCH-spine.001_162 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 45 | spine_fk.001_161 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 46 | spine_fk.001_161 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 47 | spine_fk.001_161 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 48 | MCH-spine_160 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 49 | MCH-spine_160 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 50 | MCH-spine_160 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 51 | spine_fk_159 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 52 | spine_fk_159 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 53 | spine_fk_159 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 54 | tweak_spine_155 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 55 | tweak_spine_155 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 56 | tweak_spine_155 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 57 | ORG-spine_154 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 58 | ORG-spine_154 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 59 | ORG-pelvis.L_73 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 60 | ORG-pelvis.L_73 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 61 | ORG-pelvis.L_73 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 62 | DEF-pelvis.L_72 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 63 | DEF-pelvis.L_72 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 64 | DEF-pelvis.L_72 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 65 | ORG-pelvis.R_75 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 66 | DEF-pelvis.R_74 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 67 | DEF-pelvis.R_74 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 68 | DEF-pelvis.R_74 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 69 | ORG-thigh.L_93 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 70 | ORG-thigh.L_93 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 71 | ORG-thigh.L_93 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 72 | ORG-shin.L_87 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 73 | ORG-shin.L_87 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 74 | ORG-shin.L_87 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 75 | ORG-foot.L_80 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 76 | ORG-foot.L_80 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 77 | ORG-foot.L_80 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 78 | ORG-toe.L_76 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 79 | ORG-toe.L_76 | yes | rotation | LINEAR | 190 | 0 | 3.983333 |
| 80 | ORG-toe.L_76 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 81 | ORG-heel.02.L_77 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 82 | ORG-heel.02.L_77 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 83 | ORG-heel.02.L_77 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 84 | MCH-foot_tweak.L_79 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 85 | MCH-foot_tweak.L_79 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 86 | MCH-foot_tweak.L_79 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 87 | foot_tweak.L_78 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 88 | foot_tweak.L_78 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 89 | foot_tweak.L_78 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 90 | MCH-shin_tweak.L_82 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 91 | MCH-shin_tweak.L_82 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 92 | MCH-shin_tweak.L_82 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 93 | shin_tweak.L_81 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 94 | shin_tweak.L_81 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 95 | shin_tweak.L_81 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 96 | MCH-shin_tweak.L.001_84 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 97 | MCH-shin_tweak.L.001_84 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 98 | MCH-shin_tweak.L.001_84 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 99 | shin_tweak.L.001_83 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 100 | shin_tweak.L.001_83 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 101 | shin_tweak.L.001_83 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 102 | MCH-shin_tweak.L.002_86 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 103 | MCH-shin_tweak.L.002_86 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 104 | MCH-shin_tweak.L.002_86 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 105 | shin_tweak.L.002_85 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 106 | shin_tweak.L.002_85 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 107 | shin_tweak.L.002_85 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 108 | MCH-thigh_parent_widget.L_88 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 109 | MCH-thigh_parent_widget.L_88 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 110 | MCH-thigh_parent_widget.L_88 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 111 | MCH-thigh_tweak.L.001_90 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 112 | MCH-thigh_tweak.L.001_90 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 113 | MCH-thigh_tweak.L.001_90 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 114 | thigh_tweak.L.001_89 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 115 | thigh_tweak.L.001_89 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 116 | thigh_tweak.L.001_89 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 117 | MCH-thigh_tweak.L.002_92 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 118 | MCH-thigh_tweak.L.002_92 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 119 | MCH-thigh_tweak.L.002_92 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 120 | thigh_tweak.L.002_91 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 121 | thigh_tweak.L.002_91 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 122 | thigh_tweak.L.002_91 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 123 | ORG-thigh.R_111 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 124 | ORG-thigh.R_111 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 125 | ORG-thigh.R_111 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 126 | ORG-shin.R_105 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 127 | ORG-shin.R_105 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 128 | ORG-shin.R_105 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 129 | ORG-foot.R_98 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 130 | ORG-foot.R_98 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 131 | ORG-foot.R_98 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 132 | ORG-toe.R_94 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 133 | ORG-toe.R_94 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 134 | ORG-toe.R_94 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 135 | ORG-heel.02.R_95 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 136 | ORG-heel.02.R_95 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 137 | ORG-heel.02.R_95 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 138 | MCH-foot_tweak.R_97 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 139 | MCH-foot_tweak.R_97 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 140 | MCH-foot_tweak.R_97 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 141 | foot_tweak.R_96 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 142 | foot_tweak.R_96 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 143 | MCH-shin_tweak.R_100 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 144 | MCH-shin_tweak.R_100 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 145 | MCH-shin_tweak.R_100 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 146 | shin_tweak.R_99 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 147 | shin_tweak.R_99 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 148 | shin_tweak.R_99 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 149 | MCH-shin_tweak.R.001_102 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 150 | MCH-shin_tweak.R.001_102 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 151 | MCH-shin_tweak.R.001_102 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 152 | shin_tweak.R.001_101 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 153 | shin_tweak.R.001_101 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 154 | shin_tweak.R.001_101 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 155 | MCH-shin_tweak.R.002_104 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 156 | MCH-shin_tweak.R.002_104 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 157 | MCH-shin_tweak.R.002_104 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 158 | shin_tweak.R.002_103 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 159 | shin_tweak.R.002_103 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 160 | shin_tweak.R.002_103 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 161 | MCH-thigh_parent_widget.R_106 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 162 | MCH-thigh_parent_widget.R_106 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 163 | MCH-thigh_parent_widget.R_106 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 164 | MCH-thigh_tweak.R.001_108 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 165 | MCH-thigh_tweak.R.001_108 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 166 | MCH-thigh_tweak.R.001_108 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 167 | thigh_tweak.R.001_107 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 168 | thigh_tweak.R.001_107 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 169 | thigh_tweak.R.001_107 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 170 | MCH-thigh_tweak.R.002_110 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 171 | MCH-thigh_tweak.R.002_110 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 172 | MCH-thigh_tweak.R.002_110 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 173 | thigh_tweak.R.002_109 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 174 | thigh_tweak.R.002_109 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 175 | thigh_tweak.R.002_109 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 176 | thigh_parent.L_112 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 177 | thigh_parent.L_112 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 178 | thigh_parent.L_112 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 179 | MCH-thigh_parent.L_122 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 180 | MCH-thigh_parent.L_122 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 181 | MCH-thigh_parent.L_122 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 182 | thigh_fk.L_118 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 183 | thigh_fk.L_118 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 184 | thigh_fk.L_118 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 185 | shin_fk.L_117 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 186 | shin_fk.L_117 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 187 | shin_fk.L_117 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 188 | MCH-foot_fk.L_116 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 189 | MCH-foot_fk.L_116 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 190 | MCH-foot_fk.L_116 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 191 | foot_fk.L_115 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 192 | foot_fk.L_115 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 193 | MCH-toe_fk.L_114 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 194 | MCH-toe_fk.L_114 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 195 | MCH-toe_fk.L_114 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 196 | toe_fk.L_113 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 197 | toe_fk.L_113 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 198 | toe_fk.L_113 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 199 | MCH-thigh_ik_swing.L_121 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 200 | MCH-thigh_ik_swing.L_121 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 201 | MCH-thigh_ik_swing.L_121 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 202 | thigh_ik.L_120 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 203 | thigh_ik.L_120 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 204 | thigh_ik.L_120 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 205 | MCH-shin_ik.L_119 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 206 | MCH-shin_ik.L_119 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 207 | MCH-shin_ik.L_119 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 208 | MCH-thigh_tweak.L_124 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 209 | MCH-thigh_tweak.L_124 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 210 | MCH-thigh_tweak.L_124 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 211 | thigh_tweak.L_123 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 212 | thigh_tweak.L_123 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 213 | thigh_tweak.L_123 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 214 | DEF-thigh.L_132 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 215 | DEF-thigh.L_132 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 216 | DEF-thigh.L_132 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 217 | DEF-thigh.L.001_131 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 218 | DEF-thigh.L.001_131 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 219 | DEF-thigh.L.001_131 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 220 | DEF-thigh.L.002_130 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 221 | DEF-thigh.L.002_130 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 222 | DEF-thigh.L.002_130 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 223 | DEF-shin.L_129 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 224 | DEF-shin.L_129 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 225 | DEF-shin.L_129 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 226 | DEF-shin.L.001_128 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 227 | DEF-shin.L.001_128 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 228 | DEF-shin.L.001_128 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 229 | DEF-shin.L.002_127 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 230 | DEF-shin.L.002_127 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 231 | DEF-shin.L.002_127 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 232 | DEF-foot.L_126 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 233 | DEF-foot.L_126 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 234 | DEF-foot.L_126 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 235 | DEF-toe.L_125 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 236 | DEF-toe.L_125 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 237 | DEF-toe.L_125 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 238 | thigh_parent.R_133 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 239 | thigh_parent.R_133 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 240 | thigh_parent.R_133 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 241 | MCH-thigh_parent.R_143 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 242 | MCH-thigh_parent.R_143 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 243 | MCH-thigh_parent.R_143 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 244 | thigh_fk.R_139 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 245 | thigh_fk.R_139 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 246 | shin_fk.R_138 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 247 | shin_fk.R_138 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 248 | shin_fk.R_138 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 249 | MCH-foot_fk.R_137 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 250 | MCH-foot_fk.R_137 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 251 | foot_fk.R_136 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 252 | foot_fk.R_136 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 253 | MCH-toe_fk.R_135 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 254 | MCH-toe_fk.R_135 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 255 | MCH-toe_fk.R_135 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 256 | toe_fk.R_134 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 257 | toe_fk.R_134 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 258 | toe_fk.R_134 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 259 | MCH-thigh_ik_swing.R_142 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 260 | MCH-thigh_ik_swing.R_142 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 261 | MCH-thigh_ik_swing.R_142 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 262 | thigh_ik.R_141 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 263 | thigh_ik.R_141 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 264 | thigh_ik.R_141 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 265 | MCH-shin_ik.R_140 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 266 | MCH-shin_ik.R_140 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 267 | MCH-shin_ik.R_140 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 268 | MCH-thigh_tweak.R_145 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 269 | MCH-thigh_tweak.R_145 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 270 | MCH-thigh_tweak.R_145 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 271 | thigh_tweak.R_144 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 272 | thigh_tweak.R_144 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 273 | thigh_tweak.R_144 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 274 | DEF-thigh.R_153 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 275 | DEF-thigh.R_153 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 276 | DEF-thigh.R_153 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 277 | DEF-thigh.R.001_152 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 278 | DEF-thigh.R.001_152 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 279 | DEF-thigh.R.001_152 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 280 | DEF-thigh.R.002_151 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 281 | DEF-thigh.R.002_151 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 282 | DEF-thigh.R.002_151 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 283 | DEF-shin.R_150 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 284 | DEF-shin.R_150 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 285 | DEF-shin.R_150 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 286 | DEF-shin.R.001_149 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 287 | DEF-shin.R.001_149 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 288 | DEF-shin.R.001_149 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 289 | DEF-shin.R.002_148 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 290 | DEF-shin.R.002_148 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 291 | DEF-shin.R.002_148 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 292 | DEF-foot.R_147 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 293 | DEF-foot.R_147 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 294 | DEF-foot.R_147 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 295 | DEF-toe.R_146 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 296 | DEF-toe.R_146 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 297 | DEF-toe.R_146 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 298 | tweak_spine.001_157 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 299 | tweak_spine.001_157 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 300 | tweak_spine.001_157 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 301 | ORG-spine.001_156 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 302 | ORG-spine.001_156 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 303 | ORG-spine.001_156 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 304 | MCH-WGT-hips_158 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 305 | MCH-WGT-hips_158 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 306 | MCH-WGT-hips_158 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 307 | MCH-spine.002_451 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 308 | MCH-spine.002_451 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 309 | MCH-spine.002_451 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 310 | spine_fk.002_450 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 311 | spine_fk.002_450 | yes | rotation | LINEAR | 188 | 0 | 3.983333 |
| 312 | spine_fk.002_450 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 313 | MCH-pivot_165 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 314 | MCH-pivot_165 | yes | rotation | LINEAR | 188 | 0 | 3.983333 |
| 315 | MCH-pivot_165 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 316 | tweak_spine.002_164 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 317 | tweak_spine.002_164 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 318 | tweak_spine.002_164 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 319 | ORG-spine.002_163 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 320 | ORG-spine.002_163 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 321 | ORG-spine.002_163 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 322 | MCH-spine.003_449 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 323 | MCH-spine.003_449 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 324 | MCH-spine.003_449 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 325 | spine_fk.003_448 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 326 | spine_fk.003_448 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 327 | spine_fk.003_448 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 328 | ORG-spine.004_168 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 329 | ORG-spine.004_168 | yes | rotation | LINEAR | 213 | 0 | 3.983333 |
| 330 | ORG-spine.004_168 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 331 | ORG-spine.005_167 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 332 | ORG-spine.005_167 | yes | rotation | LINEAR | 226 | 0 | 3.983333 |
| 333 | ORG-spine.005_167 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 334 | ORG-spine.006_166 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 335 | ORG-spine.006_166 | yes | rotation | LINEAR | 226 | 0 | 3.983333 |
| 336 | ORG-spine.006_166 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 337 | MCH-ROT-neck_176 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 338 | MCH-ROT-neck_176 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 339 | MCH-ROT-neck_176 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 340 | neck_175 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 341 | neck_175 | yes | rotation | LINEAR | 197 | 0 | 3.983333 |
| 342 | neck_175 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 343 | MCH-ROT-head_170 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 344 | MCH-ROT-head_170 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 345 | MCH-ROT-head_170 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 346 | head_169 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 347 | head_169 | yes | rotation | LINEAR | 206 | 0 | 3.983333 |
| 348 | head_169 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 349 | tweak_spine.004_171 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 350 | tweak_spine.004_171 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 351 | tweak_spine.004_171 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 352 | MCH-STR-neck_174 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 353 | MCH-STR-neck_174 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 354 | MCH-STR-neck_174 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 355 | MCH-spine.005_173 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 356 | MCH-spine.005_173 | yes | rotation | LINEAR | 206 | 0 | 3.983333 |
| 357 | MCH-spine.005_173 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 358 | tweak_spine.005_172 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 359 | tweak_spine.005_172 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 360 | tweak_spine.003_446 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 361 | tweak_spine.003_446 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 362 | tweak_spine.003_446 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 363 | ORG-spine.003_445 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 364 | ORG-spine.003_445 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 365 | ORG-spine.003_445 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 366 | ORG-shoulder.L_306 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 367 | ORG-shoulder.L_306 | yes | rotation | LINEAR | 113 | 0 | 3.983333 |
| 368 | ORG-upper_arm.L_192 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 369 | ORG-upper_arm.L_192 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 370 | ORG-upper_arm.L_192 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 371 | ORG-forearm.L_186 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 372 | ORG-forearm.L_186 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 373 | ORG-forearm.L_186 | yes | scale | LINEAR | 228 | 0 | 3.983333 |
| 374 | ORG-hand.L_179 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 375 | ORG-hand.L_179 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 376 | ORG-hand.L_179 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 377 | MCH-hand_tweak.L_178 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 378 | MCH-hand_tweak.L_178 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 379 | MCH-hand_tweak.L_178 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 380 | hand_tweak.L_177 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 381 | hand_tweak.L_177 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 382 | hand_tweak.L_177 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 383 | MCH-forearm_tweak.L_181 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 384 | MCH-forearm_tweak.L_181 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 385 | MCH-forearm_tweak.L_181 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 386 | forearm_tweak.L_180 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 387 | forearm_tweak.L_180 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 388 | forearm_tweak.L_180 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 389 | MCH-forearm_tweak.L.001_183 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 390 | MCH-forearm_tweak.L.001_183 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 391 | MCH-forearm_tweak.L.001_183 | yes | scale | LINEAR | 232 | 0 | 3.983333 |
| 392 | forearm_tweak.L.001_182 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 393 | forearm_tweak.L.001_182 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 394 | forearm_tweak.L.001_182 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 395 | MCH-forearm_tweak.L.002_185 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 396 | MCH-forearm_tweak.L.002_185 | yes | rotation | LINEAR | 232 | 0 | 3.983333 |
| 397 | MCH-forearm_tweak.L.002_185 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 398 | forearm_tweak.L.002_184 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 399 | forearm_tweak.L.002_184 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 400 | forearm_tweak.L.002_184 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 401 | MCH-upper_arm_parent_widget.L_187 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 402 | MCH-upper_arm_parent_widget.L_187 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 403 | MCH-upper_arm_parent_widget.L_187 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 404 | MCH-upper_arm_tweak.L.001_189 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 405 | MCH-upper_arm_tweak.L.001_189 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 406 | MCH-upper_arm_tweak.L.001_189 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 407 | upper_arm_tweak.L.001_188 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 408 | upper_arm_tweak.L.001_188 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 409 | upper_arm_tweak.L.001_188 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 410 | MCH-upper_arm_tweak.L.002_191 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 411 | MCH-upper_arm_tweak.L.002_191 | yes | rotation | LINEAR | 232 | 0 | 3.983333 |
| 412 | MCH-upper_arm_tweak.L.002_191 | yes | scale | LINEAR | 232 | 0 | 3.983333 |
| 413 | upper_arm_tweak.L.002_190 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 414 | upper_arm_tweak.L.002_190 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 415 | upper_arm_tweak.L.002_190 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 416 | DEF-shoulder.L_193 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 417 | DEF-shoulder.L_193 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 418 | DEF-shoulder.L_193 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 419 | upper_arm_parent.L_194 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 420 | upper_arm_parent.L_194 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 421 | upper_arm_parent.L_194 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 422 | MCH-upper_arm_parent.L_202 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 423 | MCH-upper_arm_parent.L_202 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 424 | MCH-upper_arm_parent.L_202 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 425 | upper_arm_fk.L_198 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 426 | upper_arm_fk.L_198 | yes | rotation | LINEAR | 185 | 0 | 3.983333 |
| 427 | upper_arm_fk.L_198 | yes | scale | LINEAR | 187 | 0 | 3.983333 |
| 428 | forearm_fk.L_197 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 429 | forearm_fk.L_197 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 430 | forearm_fk.L_197 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 431 | MCH-hand_fk.L_196 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 432 | MCH-hand_fk.L_196 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 433 | MCH-hand_fk.L_196 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 434 | hand_fk.L_195 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 435 | hand_fk.L_195 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 436 | hand_fk.L_195 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 437 | MCH-upper_arm_ik_swing.L_201 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 438 | MCH-upper_arm_ik_swing.L_201 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 439 | MCH-upper_arm_ik_swing.L_201 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 440 | upper_arm_ik.L_200 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 441 | upper_arm_ik.L_200 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 442 | upper_arm_ik.L_200 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 443 | MCH-forearm_ik.L_199 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 444 | MCH-forearm_ik.L_199 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 445 | MCH-forearm_ik.L_199 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 446 | MCH-upper_arm_tweak.L_204 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 447 | MCH-upper_arm_tweak.L_204 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 448 | MCH-upper_arm_tweak.L_204 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 449 | upper_arm_tweak.L_203 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 450 | upper_arm_tweak.L_203 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 451 | upper_arm_tweak.L_203 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 452 | DEF-upper_arm.L_305 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 453 | DEF-upper_arm.L_305 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 454 | DEF-upper_arm.L_305 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 455 | DEF-upper_arm.L.001_304 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 456 | DEF-upper_arm.L.001_304 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 457 | DEF-upper_arm.L.001_304 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 458 | DEF-upper_arm.L.002_303 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 459 | DEF-upper_arm.L.002_303 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 460 | DEF-upper_arm.L.002_303 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 461 | DEF-forearm.L_302 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 462 | DEF-forearm.L_302 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 463 | DEF-forearm.L_302 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 464 | DEF-forearm.L.001_301 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 465 | DEF-forearm.L.001_301 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 466 | DEF-forearm.L.001_301 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 467 | DEF-forearm.L.002_300 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 468 | DEF-forearm.L.002_300 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 469 | DEF-forearm.L.002_300 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 470 | DEF-hand.L_299 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 471 | DEF-hand.L_299 | yes | rotation | LINEAR | 232 | 0 | 3.983333 |
| 472 | DEF-hand.L_299 | yes | scale | LINEAR | 232 | 0 | 3.983333 |
| 473 | ORG-palm.01.L_240 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 474 | ORG-palm.01.L_240 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 475 | ORG-palm.01.L_240 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 476 | ORG-f_index.01.L_207 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 477 | ORG-f_index.01.L_207 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 478 | ORG-f_index.01.L_207 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 479 | ORG-f_index.02.L_206 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 480 | ORG-f_index.02.L_206 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 481 | ORG-f_index.02.L_206 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 482 | ORG-f_index.03.L_205 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 483 | ORG-f_index.03.L_205 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 484 | ORG-f_index.03.L_205 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 485 | ORG-thumb.01.L_210 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 486 | ORG-thumb.01.L_210 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 487 | ORG-thumb.01.L_210 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 488 | ORG-thumb.02.L_209 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 489 | ORG-thumb.02.L_209 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 490 | ORG-thumb.02.L_209 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 491 | ORG-thumb.03.L_208 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 492 | ORG-thumb.03.L_208 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 493 | ORG-thumb.03.L_208 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 494 | DEF-f_index.01.L_213 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 495 | DEF-f_index.01.L_213 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 496 | DEF-f_index.01.L_213 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 497 | DEF-f_index.02.L_212 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 498 | DEF-f_index.02.L_212 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 499 | DEF-f_index.02.L_212 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 500 | DEF-f_index.03.L_211 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 501 | DEF-f_index.03.L_211 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 502 | DEF-f_index.03.L_211 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 503 | f_index.01_master.L_214 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 504 | f_index.01_master.L_214 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 505 | f_index.01_master.L_214 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 506 | DEF-thumb.01.L_217 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 507 | DEF-thumb.01.L_217 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 508 | DEF-thumb.01.L_217 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 509 | DEF-thumb.02.L_216 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 510 | DEF-thumb.02.L_216 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 511 | DEF-thumb.02.L_216 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 512 | DEF-thumb.03.L_215 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 513 | DEF-thumb.03.L_215 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 514 | DEF-thumb.03.L_215 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 515 | thumb.01_master.L_218 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 516 | thumb.01_master.L_218 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 517 | thumb.01_master.L_218 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 518 | DEF-palm.01.L_219 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 519 | DEF-palm.01.L_219 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 520 | DEF-palm.01.L_219 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 521 | MCH-f_index.01_drv.L_228 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 522 | MCH-f_index.01_drv.L_228 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 523 | f_index.01.L_227 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 524 | f_index.01.L_227 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 525 | f_index.01.L_227 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 526 | MCH-f_index.02_drv.L_226 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 527 | MCH-f_index.02_drv.L_226 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 528 | MCH-f_index.02_drv.L_226 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 529 | f_index.02.L_225 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 530 | f_index.02.L_225 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 531 | f_index.02.L_225 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 532 | MCH-f_index.03_drv.L_223 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 533 | MCH-f_index.03_drv.L_223 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 534 | MCH-f_index.03_drv.L_223 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 535 | f_index.03.L_222 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 536 | f_index.03.L_222 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 537 | f_index.03.L_222 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 538 | f_index.01.L.001_220 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 539 | f_index.01.L.001_220 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 540 | f_index.01.L.001_220 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 541 | MCH-f_index.03.L_221 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 542 | MCH-f_index.03.L_221 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 543 | MCH-f_index.03.L_221 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 544 | MCH-f_index.02.L_224 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 545 | MCH-f_index.02.L_224 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 546 | MCH-f_index.02.L_224 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 547 | MCH-f_index.01.L_229 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 548 | MCH-f_index.01.L_229 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 549 | MCH-f_index.01.L_229 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 550 | MCH-thumb.01_drv.L_238 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 551 | MCH-thumb.01_drv.L_238 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 552 | MCH-thumb.01_drv.L_238 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 553 | thumb.01.L_237 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 554 | thumb.01.L_237 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 555 | thumb.01.L_237 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 556 | MCH-thumb.02_drv.L_236 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 557 | MCH-thumb.02_drv.L_236 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 558 | MCH-thumb.02_drv.L_236 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 559 | thumb.02.L_235 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 560 | thumb.02.L_235 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 561 | thumb.02.L_235 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 562 | MCH-thumb.03_drv.L_233 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 563 | MCH-thumb.03_drv.L_233 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 564 | MCH-thumb.03_drv.L_233 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 565 | thumb.03.L_232 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 566 | thumb.03.L_232 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 567 | thumb.03.L_232 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 568 | thumb.01.L.001_230 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 569 | thumb.01.L.001_230 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 570 | thumb.01.L.001_230 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 571 | MCH-thumb.03.L_231 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 572 | MCH-thumb.03.L_231 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 573 | MCH-thumb.03.L_231 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 574 | MCH-thumb.02.L_234 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 575 | MCH-thumb.02.L_234 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 576 | MCH-thumb.02.L_234 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 577 | MCH-thumb.01.L_239 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 578 | MCH-thumb.01.L_239 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 579 | MCH-thumb.01.L_239 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 580 | ORG-palm.02.L_259 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 581 | ORG-palm.02.L_259 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 582 | ORG-palm.02.L_259 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 583 | ORG-f_middle.01.L_243 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 584 | ORG-f_middle.01.L_243 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 585 | ORG-f_middle.01.L_243 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 586 | ORG-f_middle.02.L_242 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 587 | ORG-f_middle.02.L_242 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 588 | ORG-f_middle.02.L_242 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 589 | ORG-f_middle.03.L_241 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 590 | ORG-f_middle.03.L_241 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 591 | ORG-f_middle.03.L_241 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 592 | DEF-f_middle.01.L_246 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 593 | DEF-f_middle.01.L_246 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 594 | DEF-f_middle.01.L_246 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 595 | DEF-f_middle.02.L_245 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 596 | DEF-f_middle.02.L_245 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 597 | DEF-f_middle.02.L_245 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 598 | DEF-f_middle.03.L_244 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 599 | DEF-f_middle.03.L_244 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 600 | DEF-f_middle.03.L_244 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 601 | f_middle.01_master.L_247 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 602 | f_middle.01_master.L_247 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 603 | f_middle.01_master.L_247 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 604 | DEF-palm.02.L_248 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 605 | DEF-palm.02.L_248 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 606 | DEF-palm.02.L_248 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 607 | MCH-f_middle.01_drv.L_257 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 608 | MCH-f_middle.01_drv.L_257 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 609 | MCH-f_middle.01_drv.L_257 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 610 | f_middle.01.L_256 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 611 | f_middle.01.L_256 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 612 | f_middle.01.L_256 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 613 | MCH-f_middle.02_drv.L_255 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 614 | MCH-f_middle.02_drv.L_255 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 615 | MCH-f_middle.02_drv.L_255 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 616 | f_middle.02.L_254 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 617 | f_middle.02.L_254 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 618 | f_middle.02.L_254 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 619 | MCH-f_middle.03_drv.L_252 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 620 | MCH-f_middle.03_drv.L_252 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 621 | MCH-f_middle.03_drv.L_252 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 622 | f_middle.03.L_251 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 623 | f_middle.03.L_251 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 624 | f_middle.03.L_251 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 625 | f_middle.01.L.001_249 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 626 | f_middle.01.L.001_249 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 627 | f_middle.01.L.001_249 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 628 | MCH-f_middle.03.L_250 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 629 | MCH-f_middle.03.L_250 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 630 | MCH-f_middle.03.L_250 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 631 | MCH-f_middle.02.L_253 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 632 | MCH-f_middle.02.L_253 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 633 | MCH-f_middle.02.L_253 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 634 | MCH-f_middle.01.L_258 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 635 | MCH-f_middle.01.L_258 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 636 | MCH-f_middle.01.L_258 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 637 | ORG-palm.03.L_278 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 638 | ORG-palm.03.L_278 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 639 | ORG-palm.03.L_278 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 640 | ORG-f_ring.01.L_262 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 641 | ORG-f_ring.01.L_262 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 642 | ORG-f_ring.01.L_262 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 643 | ORG-f_ring.02.L_261 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 644 | ORG-f_ring.02.L_261 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 645 | ORG-f_ring.02.L_261 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 646 | ORG-f_ring.03.L_260 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 647 | ORG-f_ring.03.L_260 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 648 | ORG-f_ring.03.L_260 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 649 | DEF-f_ring.01.L_265 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 650 | DEF-f_ring.01.L_265 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 651 | DEF-f_ring.01.L_265 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 652 | DEF-f_ring.02.L_264 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 653 | DEF-f_ring.02.L_264 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 654 | DEF-f_ring.02.L_264 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 655 | DEF-f_ring.03.L_263 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 656 | DEF-f_ring.03.L_263 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 657 | DEF-f_ring.03.L_263 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 658 | f_ring.01_master.L_266 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 659 | f_ring.01_master.L_266 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 660 | f_ring.01_master.L_266 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 661 | DEF-palm.03.L_267 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 662 | DEF-palm.03.L_267 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 663 | DEF-palm.03.L_267 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 664 | MCH-f_ring.01_drv.L_276 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 665 | MCH-f_ring.01_drv.L_276 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 666 | MCH-f_ring.01_drv.L_276 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 667 | f_ring.01.L_275 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 668 | f_ring.01.L_275 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 669 | f_ring.01.L_275 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 670 | MCH-f_ring.02_drv.L_274 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 671 | MCH-f_ring.02_drv.L_274 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 672 | MCH-f_ring.02_drv.L_274 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 673 | f_ring.02.L_273 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 674 | f_ring.02.L_273 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 675 | f_ring.02.L_273 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 676 | MCH-f_ring.03_drv.L_271 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 677 | MCH-f_ring.03_drv.L_271 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 678 | MCH-f_ring.03_drv.L_271 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 679 | f_ring.03.L_270 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 680 | f_ring.03.L_270 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 681 | f_ring.03.L_270 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 682 | f_ring.01.L.001_268 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 683 | f_ring.01.L.001_268 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 684 | f_ring.01.L.001_268 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 685 | MCH-f_ring.03.L_269 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 686 | MCH-f_ring.03.L_269 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 687 | MCH-f_ring.03.L_269 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 688 | MCH-f_ring.02.L_272 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 689 | MCH-f_ring.02.L_272 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 690 | MCH-f_ring.02.L_272 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 691 | MCH-f_ring.01.L_277 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 692 | MCH-f_ring.01.L_277 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 693 | MCH-f_ring.01.L_277 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 694 | ORG-palm.04.L_297 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 695 | ORG-palm.04.L_297 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 696 | ORG-palm.04.L_297 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 697 | ORG-f_pinky.01.L_281 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 698 | ORG-f_pinky.01.L_281 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 699 | ORG-f_pinky.01.L_281 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 700 | ORG-f_pinky.02.L_280 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 701 | ORG-f_pinky.02.L_280 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 702 | ORG-f_pinky.02.L_280 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 703 | ORG-f_pinky.03.L_279 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 704 | ORG-f_pinky.03.L_279 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 705 | ORG-f_pinky.03.L_279 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 706 | DEF-f_pinky.01.L_284 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 707 | DEF-f_pinky.01.L_284 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 708 | DEF-f_pinky.01.L_284 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 709 | DEF-f_pinky.02.L_283 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 710 | DEF-f_pinky.02.L_283 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 711 | DEF-f_pinky.02.L_283 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 712 | DEF-f_pinky.03.L_282 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 713 | DEF-f_pinky.03.L_282 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 714 | DEF-f_pinky.03.L_282 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 715 | f_pinky.01_master.L_285 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 716 | f_pinky.01_master.L_285 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 717 | f_pinky.01_master.L_285 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 718 | DEF-palm.04.L_286 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 719 | DEF-palm.04.L_286 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 720 | DEF-palm.04.L_286 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 721 | MCH-f_pinky.01_drv.L_295 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 722 | MCH-f_pinky.01_drv.L_295 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 723 | MCH-f_pinky.01_drv.L_295 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 724 | f_pinky.01.L_294 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 725 | f_pinky.01.L_294 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 726 | f_pinky.01.L_294 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 727 | MCH-f_pinky.02_drv.L_293 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 728 | MCH-f_pinky.02_drv.L_293 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 729 | MCH-f_pinky.02_drv.L_293 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 730 | f_pinky.02.L_292 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 731 | f_pinky.02.L_292 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 732 | f_pinky.02.L_292 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 733 | MCH-f_pinky.03_drv.L_290 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 734 | MCH-f_pinky.03_drv.L_290 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 735 | MCH-f_pinky.03_drv.L_290 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 736 | f_pinky.03.L_289 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 737 | f_pinky.03.L_289 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 738 | f_pinky.03.L_289 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 739 | f_pinky.01.L.001_287 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 740 | f_pinky.01.L.001_287 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 741 | MCH-f_pinky.03.L_288 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 742 | MCH-f_pinky.03.L_288 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 743 | MCH-f_pinky.03.L_288 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 744 | MCH-f_pinky.02.L_291 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 745 | MCH-f_pinky.02.L_291 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 746 | MCH-f_pinky.02.L_291 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 747 | MCH-f_pinky.01.L_296 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 748 | MCH-f_pinky.01.L_296 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 749 | MCH-f_pinky.01.L_296 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 750 | palm.L_298 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 751 | palm.L_298 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 752 | palm.L_298 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 753 | ORG-shoulder.R_436 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 754 | ORG-shoulder.R_436 | yes | rotation | LINEAR | 124 | 0 | 3.983333 |
| 755 | ORG-shoulder.R_436 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 756 | ORG-upper_arm.R_322 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 757 | ORG-upper_arm.R_322 | yes | rotation | LINEAR | 230 | 0 | 3.983333 |
| 758 | ORG-upper_arm.R_322 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 759 | ORG-forearm.R_316 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 760 | ORG-forearm.R_316 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 761 | ORG-forearm.R_316 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 762 | ORG-hand.R_309 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 763 | ORG-hand.R_309 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 764 | ORG-hand.R_309 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 765 | MCH-hand_tweak.R_308 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 766 | MCH-hand_tweak.R_308 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 767 | hand_tweak.R_307 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 768 | hand_tweak.R_307 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 769 | hand_tweak.R_307 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 770 | MCH-forearm_tweak.R_311 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 771 | MCH-forearm_tweak.R_311 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 772 | MCH-forearm_tweak.R_311 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 773 | forearm_tweak.R_310 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 774 | forearm_tweak.R_310 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 775 | forearm_tweak.R_310 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 776 | MCH-forearm_tweak.R.001_313 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 777 | MCH-forearm_tweak.R.001_313 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 778 | MCH-forearm_tweak.R.001_313 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 779 | forearm_tweak.R.001_312 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 780 | forearm_tweak.R.001_312 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 781 | forearm_tweak.R.001_312 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 782 | MCH-forearm_tweak.R.002_315 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 783 | MCH-forearm_tweak.R.002_315 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 784 | MCH-forearm_tweak.R.002_315 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 785 | forearm_tweak.R.002_314 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 786 | forearm_tweak.R.002_314 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 787 | forearm_tweak.R.002_314 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 788 | MCH-upper_arm_parent_widget.R_317 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 789 | MCH-upper_arm_parent_widget.R_317 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 790 | MCH-upper_arm_parent_widget.R_317 | yes | scale | LINEAR | 230 | 0 | 3.983333 |
| 791 | MCH-upper_arm_tweak.R.001_319 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 792 | MCH-upper_arm_tweak.R.001_319 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 793 | MCH-upper_arm_tweak.R.001_319 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 794 | upper_arm_tweak.R.001_318 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 795 | upper_arm_tweak.R.001_318 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 796 | upper_arm_tweak.R.001_318 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 797 | MCH-upper_arm_tweak.R.002_321 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 798 | MCH-upper_arm_tweak.R.002_321 | yes | rotation | LINEAR | 232 | 0 | 3.983333 |
| 799 | MCH-upper_arm_tweak.R.002_321 | yes | scale | LINEAR | 231 | 0 | 3.983333 |
| 800 | upper_arm_tweak.R.002_320 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 801 | upper_arm_tweak.R.002_320 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 802 | upper_arm_tweak.R.002_320 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 803 | DEF-shoulder.R_323 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 804 | DEF-shoulder.R_323 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 805 | upper_arm_parent.R_324 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 806 | upper_arm_parent.R_324 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 807 | upper_arm_parent.R_324 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 808 | MCH-upper_arm_parent.R_332 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 809 | MCH-upper_arm_parent.R_332 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 810 | MCH-upper_arm_parent.R_332 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 811 | upper_arm_fk.R_328 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 812 | upper_arm_fk.R_328 | yes | rotation | LINEAR | 200 | 0 | 3.983333 |
| 813 | upper_arm_fk.R_328 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 814 | forearm_fk.R_327 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 815 | forearm_fk.R_327 | yes | rotation | LINEAR | 204 | 0 | 3.983333 |
| 816 | forearm_fk.R_327 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 817 | MCH-hand_fk.R_326 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 818 | MCH-hand_fk.R_326 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 819 | MCH-hand_fk.R_326 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 820 | hand_fk.R_325 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 821 | hand_fk.R_325 | yes | rotation | LINEAR | 204 | 0 | 3.983333 |
| 822 | hand_fk.R_325 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 823 | MCH-upper_arm_ik_swing.R_331 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 824 | MCH-upper_arm_ik_swing.R_331 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 825 | MCH-upper_arm_ik_swing.R_331 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 826 | upper_arm_ik.R_330 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 827 | upper_arm_ik.R_330 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 828 | upper_arm_ik.R_330 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 829 | MCH-forearm_ik.R_329 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 830 | MCH-forearm_ik.R_329 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 831 | MCH-forearm_ik.R_329 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 832 | MCH-upper_arm_tweak.R_334 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 833 | MCH-upper_arm_tweak.R_334 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 834 | MCH-upper_arm_tweak.R_334 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 835 | upper_arm_tweak.R_333 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 836 | upper_arm_tweak.R_333 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 837 | upper_arm_tweak.R_333 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 838 | DEF-upper_arm.R_435 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 839 | DEF-upper_arm.R_435 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 840 | DEF-upper_arm.R_435 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 841 | DEF-upper_arm.R.001_434 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 842 | DEF-upper_arm.R.001_434 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 843 | DEF-upper_arm.R.001_434 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 844 | DEF-upper_arm.R.002_433 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 845 | DEF-upper_arm.R.002_433 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 846 | DEF-upper_arm.R.002_433 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 847 | DEF-forearm.R_432 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 848 | DEF-forearm.R_432 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 849 | DEF-forearm.R_432 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 850 | DEF-forearm.R.001_431 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 851 | DEF-forearm.R.001_431 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 852 | DEF-forearm.R.001_431 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 853 | DEF-forearm.R.002_430 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 854 | DEF-forearm.R.002_430 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 855 | DEF-forearm.R.002_430 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 856 | DEF-hand.R_429 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 857 | DEF-hand.R_429 | yes | rotation | LINEAR | 233 | 0 | 3.983333 |
| 858 | DEF-hand.R_429 | yes | scale | LINEAR | 233 | 0 | 3.983333 |
| 859 | ORG-palm.01.R_370 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 860 | ORG-palm.01.R_370 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 861 | ORG-palm.01.R_370 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 862 | ORG-f_index.01.R_337 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 863 | ORG-f_index.01.R_337 | yes | rotation | LINEAR | 230 | 0 | 3.983333 |
| 864 | ORG-f_index.01.R_337 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 865 | ORG-f_index.02.R_336 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 866 | ORG-f_index.02.R_336 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 867 | ORG-f_index.02.R_336 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 868 | ORG-f_index.03.R_335 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 869 | ORG-f_index.03.R_335 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 870 | ORG-f_index.03.R_335 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 871 | ORG-thumb.01.R_340 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 872 | ORG-thumb.01.R_340 | yes | rotation | LINEAR | 212 | 0 | 3.983333 |
| 873 | ORG-thumb.01.R_340 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 874 | ORG-thumb.02.R_339 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 875 | ORG-thumb.02.R_339 | yes | rotation | LINEAR | 216 | 0 | 3.983333 |
| 876 | ORG-thumb.02.R_339 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 877 | ORG-thumb.03.R_338 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 878 | ORG-thumb.03.R_338 | yes | rotation | LINEAR | 216 | 0 | 3.983333 |
| 879 | ORG-thumb.03.R_338 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 880 | DEF-f_index.01.R_343 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 881 | DEF-f_index.01.R_343 | yes | rotation | LINEAR | 230 | 0 | 3.983333 |
| 882 | DEF-f_index.01.R_343 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 883 | DEF-f_index.02.R_342 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 884 | DEF-f_index.02.R_342 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 885 | DEF-f_index.02.R_342 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 886 | DEF-f_index.03.R_341 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 887 | DEF-f_index.03.R_341 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 888 | DEF-f_index.03.R_341 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 889 | f_index.01_master.R_344 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 890 | f_index.01_master.R_344 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 891 | f_index.01_master.R_344 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 892 | DEF-thumb.01.R_347 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 893 | DEF-thumb.01.R_347 | yes | rotation | LINEAR | 212 | 0 | 3.983333 |
| 894 | DEF-thumb.01.R_347 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 895 | DEF-thumb.02.R_346 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 896 | DEF-thumb.02.R_346 | yes | rotation | LINEAR | 216 | 0 | 3.983333 |
| 897 | DEF-thumb.02.R_346 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 898 | DEF-thumb.03.R_345 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 899 | DEF-thumb.03.R_345 | yes | rotation | LINEAR | 216 | 0 | 3.983333 |
| 900 | DEF-thumb.03.R_345 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 901 | thumb.01_master.R_348 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 902 | thumb.01_master.R_348 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 903 | thumb.01_master.R_348 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 904 | DEF-palm.01.R_349 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 905 | DEF-palm.01.R_349 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 906 | DEF-palm.01.R_349 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 907 | MCH-f_index.01_drv.R_358 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 908 | MCH-f_index.01_drv.R_358 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 909 | MCH-f_index.01_drv.R_358 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 910 | f_index.01.R_357 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 911 | f_index.01.R_357 | yes | rotation | LINEAR | 230 | 0 | 3.983333 |
| 912 | f_index.01.R_357 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 913 | MCH-f_index.02_drv.R_356 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 914 | MCH-f_index.02_drv.R_356 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 915 | MCH-f_index.02_drv.R_356 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 916 | f_index.02.R_355 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 917 | f_index.02.R_355 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 918 | MCH-f_index.03_drv.R_353 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 919 | MCH-f_index.03_drv.R_353 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 920 | MCH-f_index.03_drv.R_353 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 921 | f_index.03.R_352 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 922 | f_index.03.R_352 | yes | rotation | LINEAR | 231 | 0 | 3.983333 |
| 923 | f_index.03.R_352 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 924 | f_index.01.R.001_350 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 925 | f_index.01.R.001_350 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 926 | f_index.01.R.001_350 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 927 | MCH-f_index.03.R_351 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 928 | MCH-f_index.03.R_351 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 929 | MCH-f_index.03.R_351 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 930 | MCH-f_index.02.R_354 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 931 | MCH-f_index.02.R_354 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 932 | MCH-f_index.02.R_354 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 933 | MCH-f_index.01.R_359 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 934 | MCH-f_index.01.R_359 | yes | rotation | LINEAR | 230 | 0 | 3.983333 |
| 935 | MCH-f_index.01.R_359 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 936 | MCH-thumb.01_drv.R_368 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 937 | MCH-thumb.01_drv.R_368 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 938 | MCH-thumb.01_drv.R_368 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 939 | thumb.01.R_367 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 940 | thumb.01.R_367 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 941 | thumb.01.R_367 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 942 | MCH-thumb.02_drv.R_366 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 943 | MCH-thumb.02_drv.R_366 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 944 | MCH-thumb.02_drv.R_366 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 945 | thumb.02.R_365 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 946 | thumb.02.R_365 | yes | rotation | LINEAR | 197 | 0 | 3.983333 |
| 947 | thumb.02.R_365 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 948 | MCH-thumb.03_drv.R_363 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 949 | MCH-thumb.03_drv.R_363 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 950 | MCH-thumb.03_drv.R_363 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 951 | thumb.03.R_362 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 952 | thumb.03.R_362 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 953 | thumb.03.R_362 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 954 | thumb.01.R.001_360 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 955 | thumb.01.R.001_360 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 956 | thumb.01.R.001_360 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 957 | MCH-thumb.03.R_361 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 958 | MCH-thumb.03.R_361 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 959 | MCH-thumb.03.R_361 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 960 | MCH-thumb.02.R_364 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 961 | MCH-thumb.02.R_364 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 962 | MCH-thumb.02.R_364 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 963 | MCH-thumb.01.R_369 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 964 | MCH-thumb.01.R_369 | yes | rotation | LINEAR | 212 | 0 | 3.983333 |
| 965 | MCH-thumb.01.R_369 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 966 | ORG-palm.02.R_389 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 967 | ORG-palm.02.R_389 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 968 | ORG-palm.02.R_389 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 969 | ORG-f_middle.01.R_373 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 970 | ORG-f_middle.01.R_373 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 971 | ORG-f_middle.01.R_373 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 972 | ORG-f_middle.02.R_372 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 973 | ORG-f_middle.02.R_372 | yes | rotation | LINEAR | 211 | 0 | 3.983333 |
| 974 | ORG-f_middle.02.R_372 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 975 | ORG-f_middle.03.R_371 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 976 | ORG-f_middle.03.R_371 | yes | rotation | LINEAR | 227 | 0 | 3.983333 |
| 977 | ORG-f_middle.03.R_371 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 978 | DEF-f_middle.01.R_376 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 979 | DEF-f_middle.01.R_376 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 980 | DEF-f_middle.01.R_376 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 981 | DEF-f_middle.02.R_375 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 982 | DEF-f_middle.02.R_375 | yes | rotation | LINEAR | 211 | 0 | 3.983333 |
| 983 | DEF-f_middle.02.R_375 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 984 | DEF-f_middle.03.R_374 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 985 | DEF-f_middle.03.R_374 | yes | rotation | LINEAR | 227 | 0 | 3.983333 |
| 986 | DEF-f_middle.03.R_374 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 987 | f_middle.01_master.R_377 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 988 | f_middle.01_master.R_377 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 989 | f_middle.01_master.R_377 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 990 | DEF-palm.02.R_378 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 991 | DEF-palm.02.R_378 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 992 | DEF-palm.02.R_378 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 993 | MCH-f_middle.01_drv.R_387 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 994 | MCH-f_middle.01_drv.R_387 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 995 | MCH-f_middle.01_drv.R_387 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 996 | f_middle.01.R_386 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 997 | f_middle.01.R_386 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 998 | f_middle.01.R_386 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 999 | MCH-f_middle.02_drv.R_385 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1000 | MCH-f_middle.02_drv.R_385 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1001 | MCH-f_middle.02_drv.R_385 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1002 | f_middle.02.R_384 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1003 | f_middle.02.R_384 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1004 | f_middle.02.R_384 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 1005 | MCH-f_middle.03_drv.R_382 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1006 | MCH-f_middle.03_drv.R_382 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1007 | MCH-f_middle.03_drv.R_382 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1008 | f_middle.03.R_381 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1009 | f_middle.03.R_381 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1010 | f_middle.03.R_381 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 1011 | f_middle.01.R.001_379 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1012 | f_middle.01.R.001_379 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 1013 | f_middle.01.R.001_379 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1014 | MCH-f_middle.03.R_380 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1015 | MCH-f_middle.03.R_380 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1016 | MCH-f_middle.03.R_380 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1017 | MCH-f_middle.02.R_383 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1018 | MCH-f_middle.02.R_383 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1019 | MCH-f_middle.02.R_383 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1020 | MCH-f_middle.01.R_388 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1021 | MCH-f_middle.01.R_388 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1022 | MCH-f_middle.01.R_388 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1023 | ORG-palm.03.R_408 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1024 | ORG-palm.03.R_408 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1025 | ORG-palm.03.R_408 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1026 | ORG-f_ring.01.R_392 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1027 | ORG-f_ring.01.R_392 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1028 | ORG-f_ring.01.R_392 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1029 | ORG-f_ring.02.R_391 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1030 | ORG-f_ring.02.R_391 | yes | rotation | LINEAR | 210 | 0 | 3.983333 |
| 1031 | ORG-f_ring.02.R_391 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1032 | ORG-f_ring.03.R_390 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1033 | ORG-f_ring.03.R_390 | yes | rotation | LINEAR | 211 | 0 | 3.983333 |
| 1034 | ORG-f_ring.03.R_390 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1035 | DEF-f_ring.01.R_395 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1036 | DEF-f_ring.01.R_395 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1037 | DEF-f_ring.01.R_395 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1038 | DEF-f_ring.02.R_394 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1039 | DEF-f_ring.02.R_394 | yes | rotation | LINEAR | 210 | 0 | 3.983333 |
| 1040 | DEF-f_ring.02.R_394 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1041 | DEF-f_ring.03.R_393 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1042 | DEF-f_ring.03.R_393 | yes | rotation | LINEAR | 211 | 0 | 3.983333 |
| 1043 | DEF-f_ring.03.R_393 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1044 | f_ring.01_master.R_396 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1045 | f_ring.01_master.R_396 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1046 | f_ring.01_master.R_396 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1047 | DEF-palm.03.R_397 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1048 | DEF-palm.03.R_397 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1049 | MCH-f_ring.01_drv.R_406 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1050 | MCH-f_ring.01_drv.R_406 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1051 | MCH-f_ring.01_drv.R_406 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1052 | f_ring.01.R_405 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1053 | f_ring.01.R_405 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1054 | f_ring.01.R_405 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 1055 | MCH-f_ring.02_drv.R_404 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1056 | MCH-f_ring.02_drv.R_404 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1057 | MCH-f_ring.02_drv.R_404 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1058 | f_ring.02.R_403 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1059 | f_ring.02.R_403 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1060 | f_ring.02.R_403 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1061 | MCH-f_ring.03_drv.R_401 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1062 | MCH-f_ring.03_drv.R_401 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1063 | MCH-f_ring.03_drv.R_401 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1064 | f_ring.03.R_400 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1065 | f_ring.03.R_400 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1066 | f_ring.03.R_400 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 1067 | f_ring.01.R.001_398 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1068 | f_ring.01.R.001_398 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 1069 | f_ring.01.R.001_398 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1070 | MCH-f_ring.03.R_399 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1071 | MCH-f_ring.03.R_399 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1072 | MCH-f_ring.03.R_399 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1073 | MCH-f_ring.02.R_402 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1074 | MCH-f_ring.02.R_402 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1075 | MCH-f_ring.02.R_402 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1076 | MCH-f_ring.01.R_407 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1077 | MCH-f_ring.01.R_407 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1078 | MCH-f_ring.01.R_407 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1079 | ORG-palm.04.R_427 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1080 | ORG-palm.04.R_427 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1081 | ORG-palm.04.R_427 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1082 | ORG-f_pinky.01.R_411 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1083 | ORG-f_pinky.01.R_411 | yes | rotation | LINEAR | 208 | 0 | 3.983333 |
| 1084 | ORG-f_pinky.01.R_411 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1085 | ORG-f_pinky.02.R_410 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1086 | ORG-f_pinky.02.R_410 | yes | rotation | LINEAR | 210 | 0 | 3.983333 |
| 1087 | ORG-f_pinky.02.R_410 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1088 | ORG-f_pinky.03.R_409 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1089 | ORG-f_pinky.03.R_409 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1090 | ORG-f_pinky.03.R_409 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1091 | DEF-f_pinky.01.R_414 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1092 | DEF-f_pinky.01.R_414 | yes | rotation | LINEAR | 208 | 0 | 3.983333 |
| 1093 | DEF-f_pinky.01.R_414 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1094 | DEF-f_pinky.02.R_413 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1095 | DEF-f_pinky.02.R_413 | yes | rotation | LINEAR | 210 | 0 | 3.983333 |
| 1096 | DEF-f_pinky.02.R_413 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1097 | DEF-f_pinky.03.R_412 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1098 | DEF-f_pinky.03.R_412 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1099 | DEF-f_pinky.03.R_412 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1100 | f_pinky.01_master.R_415 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1101 | f_pinky.01_master.R_415 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1102 | f_pinky.01_master.R_415 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1103 | DEF-palm.04.R_416 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1104 | DEF-palm.04.R_416 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1105 | MCH-f_pinky.01_drv.R_425 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1106 | MCH-f_pinky.01_drv.R_425 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1107 | MCH-f_pinky.01_drv.R_425 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1108 | f_pinky.01.R_424 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1109 | f_pinky.01.R_424 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1110 | f_pinky.01.R_424 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 1111 | MCH-f_pinky.02_drv.R_423 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1112 | MCH-f_pinky.02_drv.R_423 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1113 | f_pinky.02.R_422 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1114 | f_pinky.02.R_422 | yes | rotation | LINEAR | 205 | 0 | 3.983333 |
| 1115 | f_pinky.02.R_422 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1116 | MCH-f_pinky.03_drv.R_420 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1117 | MCH-f_pinky.03_drv.R_420 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1118 | f_pinky.03.R_419 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1119 | f_pinky.03.R_419 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 1120 | f_pinky.03.R_419 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1121 | f_pinky.01.R.001_417 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1122 | f_pinky.01.R.001_417 | yes | rotation | LINEAR | 2 | 0 | 3.983333 |
| 1123 | f_pinky.01.R.001_417 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 1124 | MCH-f_pinky.03.R_418 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1125 | MCH-f_pinky.03.R_418 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1126 | MCH-f_pinky.03.R_418 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1127 | MCH-f_pinky.02.R_421 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1128 | MCH-f_pinky.02.R_421 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1129 | MCH-f_pinky.02.R_421 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1130 | MCH-f_pinky.01.R_426 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1131 | MCH-f_pinky.01.R_426 | yes | rotation | LINEAR | 208 | 0 | 3.983333 |
| 1132 | MCH-f_pinky.01.R_426 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1133 | palm.R_428 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1134 | palm.R_428 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1135 | palm.R_428 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1136 | ORG-breast.L_438 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1137 | ORG-breast.L_438 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1138 | ORG-breast.L_438 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1139 | DEF-breast.L_437 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1140 | DEF-breast.L_437 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1141 | DEF-breast.L_437 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1142 | ORG-breast.R_440 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1143 | ORG-breast.R_440 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1144 | ORG-breast.R_440 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1145 | DEF-breast.R_439 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1146 | DEF-breast.R_439 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1147 | DEF-breast.R_439 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1148 | breast.L_441 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1149 | breast.L_441 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1150 | breast.L_441 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1151 | breast.R_442 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1152 | breast.R_442 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1153 | breast.R_442 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1154 | shoulder.L_443 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1155 | shoulder.L_443 | yes | rotation | LINEAR | 113 | 0 | 3.983333 |
| 1156 | shoulder.R_444 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1157 | shoulder.R_444 | yes | rotation | LINEAR | 124 | 0 | 3.983333 |
| 1158 | shoulder.R_444 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1159 | MCH-WGT-chest_447 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1160 | MCH-WGT-chest_447 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1161 | MCH-WGT-chest_447 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1162 | hand_ik.L_455 | yes | translation | LINEAR | 82 | 0 | 3.983333 |
| 1163 | hand_ik.L_455 | yes | rotation | LINEAR | 75 | 0 | 3.983333 |
| 1164 | hand_ik.L_455 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 1165 | MCH-upper_arm_ik_target.L_454 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 1166 | MCH-upper_arm_ik_target.L_454 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1167 | MCH-upper_arm_ik_target.L_454 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1168 | MCH-upper_arm_ik_target.parent.L_458 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 1169 | MCH-upper_arm_ik_target.parent.L_458 | yes | rotation | LINEAR | 188 | 0 | 3.983333 |
| 1170 | MCH-upper_arm_ik_target.parent.L_458 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1171 | upper_arm_ik_target.L_457 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1172 | upper_arm_ik_target.L_457 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1173 | upper_arm_ik_target.L_457 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1174 | hand_ik.R_460 | yes | translation | LINEAR | 39 | 0 | 3.983333 |
| 1175 | hand_ik.R_460 | yes | rotation | LINEAR | 39 | 0 | 3.983333 |
| 1176 | hand_ik.R_460 | yes | scale | LINEAR | 2 | 0 | 3.983333 |
| 1177 | MCH-upper_arm_ik_target.R_459 | yes | translation | LINEAR | 198 | 0 | 3.983333 |
| 1178 | MCH-upper_arm_ik_target.R_459 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1179 | MCH-upper_arm_ik_target.R_459 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1180 | MCH-upper_arm_ik_target.parent.R_463 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 1181 | MCH-upper_arm_ik_target.parent.R_463 | yes | rotation | LINEAR | 188 | 0 | 3.983333 |
| 1182 | MCH-upper_arm_ik_target.parent.R_463 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1183 | upper_arm_ik_target.R_462 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1184 | upper_arm_ik_target.R_462 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1185 | upper_arm_ik_target.R_462 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1186 | foot_ik.L_474 | yes | translation | LINEAR | 64 | 0 | 3.983333 |
| 1187 | foot_ik.L_474 | yes | rotation | LINEAR | 64 | 0 | 3.983333 |
| 1188 | foot_spin_ik.L_473 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1189 | foot_heel_ik.L_464 | yes | translation | LINEAR | 2 | 0 | 3.983333 |
| 1190 | foot_heel_ik.L_464 | yes | rotation | LINEAR | 68 | 0 | 3.983333 |
| 1191 | foot_heel_ik.L_464 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1192 | MCH-heel.02_rock2.L_472 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1193 | MCH-heel.02_rock2.L_472 | yes | rotation | LINEAR | 67 | 0 | 3.983333 |
| 1194 | MCH-heel.02_rock2.L_472 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1195 | MCH-heel.02_rock1.L_471 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1196 | MCH-heel.02_rock1.L_471 | yes | rotation | LINEAR | 68 | 0 | 3.983333 |
| 1197 | MCH-heel.02_rock1.L_471 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1198 | MCH-heel.02_roll2.L_470 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1199 | MCH-heel.02_roll2.L_470 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1200 | MCH-heel.02_roll2.L_470 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1201 | MCH-heel.02_roll1.L_469 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1202 | MCH-heel.02_roll1.L_469 | yes | rotation | LINEAR | 68 | 0 | 3.983333 |
| 1203 | MCH-heel.02_roll1.L_469 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1204 | MCH-foot_roll.L_468 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1205 | MCH-foot_roll.L_468 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1206 | MCH-foot_roll.L_468 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1207 | MCH-thigh_ik_target.L_467 | yes | translation | LINEAR | 221 | 0 | 3.983333 |
| 1208 | MCH-thigh_ik_target.L_467 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1209 | MCH-thigh_ik_target.L_467 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1210 | MCH-toe_ik_parent.L_466 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1211 | MCH-toe_ik_parent.L_466 | yes | rotation | LINEAR | 190 | 0 | 3.983333 |
| 1212 | MCH-toe_ik_parent.L_466 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1213 | toe_ik.L_465 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1214 | toe_ik.L_465 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1215 | MCH-thigh_ik_target.parent.L_477 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 1216 | MCH-thigh_ik_target.parent.L_477 | yes | rotation | LINEAR | 159 | 0 | 3.983333 |
| 1217 | MCH-thigh_ik_target.parent.L_477 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1218 | thigh_ik_target.L_476 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1219 | thigh_ik_target.L_476 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1220 | thigh_ik_target.L_476 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1221 | foot_ik.R_488 | yes | translation | LINEAR | 37 | 0 | 3.983333 |
| 1222 | foot_ik.R_488 | yes | rotation | LINEAR | 34 | 0 | 3.983333 |
| 1223 | foot_spin_ik.R_487 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1224 | foot_heel_ik.R_478 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1225 | MCH-heel.02_rock2.R_486 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1226 | MCH-heel.02_rock1.R_485 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1227 | MCH-heel.02_roll2.R_484 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1228 | MCH-heel.02_roll1.R_483 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1229 | MCH-heel.02_roll1.R_483 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1230 | MCH-heel.02_roll1.R_483 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1231 | MCH-foot_roll.R_482 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1232 | MCH-foot_roll.R_482 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1233 | MCH-foot_roll.R_482 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1234 | MCH-thigh_ik_target.R_481 | yes | translation | LINEAR | 209 | 0 | 3.983333 |
| 1235 | MCH-thigh_ik_target.R_481 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1236 | MCH-thigh_ik_target.R_481 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1237 | MCH-toe_ik_parent.R_480 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1238 | MCH-toe_ik_parent.R_480 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1239 | MCH-toe_ik_parent.R_480 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1240 | toe_ik.R_479 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1241 | toe_ik.R_479 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1242 | toe_ik.R_479 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1243 | MCH-thigh_ik_target.parent.R_491 | yes | translation | LINEAR | 233 | 0 | 3.983333 |
| 1244 | MCH-thigh_ik_target.parent.R_491 | yes | rotation | LINEAR | 159 | 0 | 3.983333 |
| 1245 | MCH-thigh_ik_target.parent.R_491 | yes | scale | LINEAR | 3 | 0 | 3.983333 |
| 1246 | thigh_ik_target.R_490 | yes | translation | LINEAR | 3 | 0 | 3.983333 |
| 1247 | thigh_ik_target.R_490 | yes | rotation | LINEAR | 3 | 0 | 3.983333 |
| 1248 | thigh_ik_target.R_490 | yes | scale | LINEAR | 3 | 0 | 3.983333 |

### Images and materials

- Images: 9; textures: 9; materials: 8.
- Image [0] (image 0): image/jpeg, embedded.
- Image [1] (image 1): image/jpeg, embedded.
- Image [2] (image 2): image/jpeg, embedded.
- Image [3] (image 3): image/jpeg, embedded.
- Image [4] (image 4): image/jpeg, embedded.
- Image [5] (image 5): image/jpeg, embedded.
- Image [6] (image 6): image/png, embedded.
- Image [7] (image 7): image/jpeg, embedded.
- Image [8] (image 8): image/png, embedded.
- Material [0] uniform: OPAQUE, double-sided=true.
- Material [1] legs: OPAQUE, double-sided=true.
- Material [2] boots: OPAQUE, double-sided=true.
- Material [3] material: OPAQUE, double-sided=true.
- Material [4] face: OPAQUE, double-sided=true.
- Material [5] eyelash: BLEND, double-sided=true.
- Material [6] eyes: OPAQUE, double-sided=true.
- Material [7] hair: OPAQUE, double-sided=true.

### License/source metadata found in the GLB

```json
{
  "copyright": null,
  "generator": "Sketchfab-16.75.0",
  "assetExtras": {
    "author": "aleganda (https://sketchfab.com/aleganda)",
    "license": "CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)",
    "source": "https://sketchfab.com/3d-models/cristiano-ronaldo-710d1b01b0624135861feb3f0bb7048a",
    "title": "cristiano ronaldo"
  },
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

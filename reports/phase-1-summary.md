# GIAI DOAN 1 - TOM TAT XAC MINH ASSET

Ngay hoan thanh: 2026-10-21.

Nguon yeu cau: `PROMPT.md`. Hai file GLB goc chi duoc doc; khong bi sua, toi uu, convert hay ghi de.

## Phuong phap

1. `scripts/analyze-glb.mjs` doc truc tiep GLB header, JSON/BIN chunks, accessors, scene graph, world transforms, skins va animations.
2. Ket qua duoc xuat ra `reports/glb-analysis.json` va `reports/glb-analysis.md`.
3. So lieu mesh/bounds/animation duoc doi chieu doc lap bang `@gltf-transform/cli inspect`.
4. Cau truc file duoc kiem tra bang Khronos glTF Validator thong qua `@gltf-transform/cli validate`.
5. SHA-256 duoc kiem tra lai sau phan tich de bao dam file goc khong thay doi.

## Doi chieu thong so trong prompt

| Thuoc tinh | Ronaldo thuc te | Messi thuc te | Ket qua doi chieu |
|---|---:|---:|---|
| GLB version | 2.0 | 2.0 | Khop |
| Kich thuoc file | 3,256,648 bytes | 10,881,188 bytes | Khop mo ta xap xi |
| Mesh | 1 | 10 | Khop |
| Triangles | 17,392 | 29,554 | Khop chinh xac |
| Skin | 1 | 1 | Khop |
| Joints | 17 | 34 | Khop |
| Embedded PNG textures | 6 | 8 | Khop |
| Animation clips | 6 | 1 | Khop |

## Ronaldo

- Mesh: `RealSkinnedCharacterMesh`, gom 12 primitives va 12 materials.
- Skin: `HumanoidRig`; skeleton root `Hips`; 17 joints.
- Skeleton chinh: `Hips -> Spine -> Chest`, sau do chia thanh dau, hai tay va hai chan.
- Hai bone chan: `LeftFoot` va `RightFoot`, bind world Y = `0.16`.
- World bounds: min `[-0.697003, 0.028, -0.26]`; max `[0.697003, 3.399, 0.46]`.
- Kich thuoc: `[1.394005, 3.371, 0.72]`; ground hinh hoc Y = `0.028`.
- File theo quy uoc glTF right-handed, +Y up; root khong co phep xoay/scale bat thuong.

Animation:

| Clip | Duration | Tracks | Bone/noi dung dieu khien dang chu y |
|---|---:|---:|---|
| Idle | 3.0s | 4 | Hips translation; Chest va hai upper arm rotation |
| SIUUU | 4.5s | 9 | Hips translation/rotation, tay, dui, ong chan va nguc |
| Calma | 3.0s | 5 | Hai tay/cang tay va nguc |
| Sleep | 3.0s | 6 | Nguc, dau, tay va cang tay |
| Power Pose | 3.0s | 5 | Hai tay/cang tay va nguc |
| Point Up | 3.0s | 4 | Hai tay, dau va nguc |

`SIUUU` co root/hips motion. Giai doan animation phai chay clip tren mot parent normalization rieng, theo doi chan/ground va dua nhan vat ve Idle ma khong de vi tri bi troi.

## Messi

- 10 meshes, moi mesh mot primitive/material; tong 29,554 triangles.
- Skin co 34 joints; skeleton root `_rootJoint`, humanoid root `mixamorig:Hips_00`.
- Bone dung cho procedural animation da xac minh gom `mixamorig:Spine_01`, `mixamorig:Spine1_012`, `mixamorig:Spine2_013`, `mixamorig:Neck_014`, `mixamorig:Head_015`, `mixamorig:LeftArm_018`, `mixamorig:LeftForeArm_019`, `mixamorig:RightArm_027`, `mixamorig:RightForeArm_028` va cac bone tay/chan lien quan.
- World bounds: min `[-0.693483, -0.484724, -0.157187]`; max `[0.586148, 0.478421, 0.091944]`.
- Kich thuoc: `[1.279631, 0.963145, 0.249132]`; ground hinh hoc Y = `-0.484724`.
- Root `Sketchfab_model` xoay `-90 do` quanh X de chuyen he truc FBX sang glTF; node FBX con co scale `0.01`.
- Bone skeleton van mang don vi/transform FBX va duoc bu tru boi inverse bind matrices. Vi vay toa do world tho cua bone Foot/Toe khong phai ground cua mesh va khong duoc dung truc tiep de can san.
- Chuan hoa sau nay phai boc scene trong parent transform, giu nguyen hierarchy/skin, cap nhat world matrices va do lai posed/skinned `Box3`.

Animation `mixamo.com`:

- Duration chinh xac `1.066667s`.
- 50 tracks, LINEAR, dieu khien 28/34 joints.
- Co ca translation va rotation tren nhieu bone, bao gom Hips, Spine, Neck, Head, tay, ngon tay, chan, Foot va Toe.
- Chi co du lieu nhi phan chua du de ket luan day la dong tac gi. Hanh dong thuc te phai duoc quan sat tai `/debug` trong Giai doan 2, dung nhu prompt yeu cau.

## Chenh lech ty le va ground

- Chieu cao bbox Y hien tai: Ronaldo `3.371`, Messi `0.963145`.
- Ty le chenh lech so bo Ronaldo/Messi la khoang `3.500` lan.
- Khong duoc dat ca hai `scale=1`.
- Khong chot scale game chi tu so lieu tinh vi Messi co root conversion va animation pose. Scale cuoi cung phai tinh sau khi load bang Three.js va do bbox thuc trong scene.

## Ket qua validator va rui ro can xu ly

Hai file doc duoc, nhung khong dat hoan toan Khronos glTF Validator:

- Ronaldo: 33 animation sampler input accessors thieu `min/max`. Ngoai ra validator bao mot so normal khong don vi va du lieu joint co weight 0.
- Messi: 50 animation sampler output accessors nam trong buffer view co `byteStride`, khong dung rang buoc animation accessor cua glTF 2.0. Validator cung bao nhieu joint index co weight 0.
- Khong sua hai file goc. Giai doan 2 phai kiem tra kha nang dung sai cua Three.js `GLTFLoader`, texture, skinning va tung clip tren WebGL that.
- Neu loader that bai, phai hien loi cu the va nghien cuu ban sao runtime/derived asset; khong thay model bang placeholder va khong ghi de asset goc.

## Metadata giay phep

Messi co metadata trong GLB:

- Title: `messi 2023 3d free`.
- Author: `Ltti....................Ttg`.
- License: `CC-BY-4.0`.
- Source: `https://sketchfab.com/3d-models/messi-2023-3d-free-38fb7c1839064abd9e0a1b7e1e7d68a9`.

Ronaldo chi co generator `Python rigged GLB - custom procedural authoring`, khong co author/license/source. Khong duoc tu khang dinh co quyen su dung thuong mai.

## Tinh toan ven file goc

- Ronaldo SHA-256: `f1c0daf2165a7c993eeb77ea31c69318cf5777a7b13fd8de8ae7f2975d0f1327`.
- Messi SHA-256: `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`.

Day la checksum sau khi phan tich va trung voi checksum luc bat dau Giai doan 1.

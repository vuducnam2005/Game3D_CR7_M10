export type CharacterId = 'ronaldo' | 'messi';

export interface CharacterDefinition {
  id: CharacterId;
  label: string;
  shortLabel: string;
  assetUrl: string;
  sourceFile: string;
  accent: string;
  accentSoft: string;
  defaultAnimation: string;
  targetHeight: number;
  sourceGroundY?: number;
}

export const CHARACTER_CATALOG: Record<CharacterId, CharacterDefinition> = {
  ronaldo: {
    id: 'ronaldo',
    label: 'Cristiano Ronaldo',
    shortLabel: 'CR7',
    assetUrl: '/models/cristiano_ronaldo.glb',
    sourceFile: 'cristiano_ronaldo.glb',
    accent: '#ff4b32',
    accentSoft: 'rgba(255, 75, 50, 0.2)',
    defaultAnimation: 'Idle',
    targetHeight: 3.15,
    sourceGroundY: 0,
  },
  messi: {
    id: 'messi',
    label: 'Lionel Messi',
    shortLabel: 'M10',
    assetUrl: '/models/messi_2023_3d_free.glb',
    sourceFile: 'messi_2023_3d_free.glb',
    accent: '#39bfff',
    accentSoft: 'rgba(57, 191, 255, 0.2)',
    defaultAnimation: 'Messi Idle',
    targetHeight: 3.15,
  },
};

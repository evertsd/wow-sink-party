import { Color } from '../../util';
import { Attributes, WoWClassType, load, save } from './schema';
import { Database } from '../database';

export * from './schema';

export const set = async (id: number, character: Attributes) => {
  const payload = save(character);

  try {
    await Database.characters.doc(`${id}`).set(payload);
  } catch (e) {
    console.log(`Character.set, error: ${e}`);
  }
};

export const get = async (id: string) => {
  const doc = await Database.characters.doc(id).get();

  return load(doc);
}

type WoWClassColors = { [key in WoWClassType]: Color.Model; }

export const OriginalClassColors: WoWClassColors = {
  [WoWClassType.warrior]: [199, 156, 110],
  [WoWClassType.paladin]: [245, 140, 186],
  [WoWClassType.hunter]: [171, 212, 115],
  [WoWClassType.rogue]: [255, 245, 105],
  [WoWClassType.priest]: [255, 255, 255],
  [WoWClassType.shaman]: [0, 112, 222],
  [WoWClassType.mage]: [64, 199, 235],
  [WoWClassType.warlock]: [135, 135, 237],
  [WoWClassType.druid]: [255, 125, 10],
  [WoWClassType.deathKnight]: [196, 31, 59],
  [WoWClassType.demonHunter]: [163, 48, 201],
};

// calculated using https://accessible-colors.com/ for #404040
export const AccessibleClassColors: WoWClassColors = {
  ...OriginalClassColors,
  /*
  [WoWClassType.warrior]: [203, 164, 121],
  [WoWClassType.shaman]: [95, 176, 255],
  [WoWClassType.warlock]: [164, 164, 241],
  [WoWClassType.druid]: [255, 142, 41],
  [WoWClassType.deathKnight]: [137, 22, 41], // [238, 145, 161],
  [WoWClassType.demonHunter]: [113, 33, 140], // [209, 149, 230],
  */
}

export const sortByLevel = (a: Attributes, b: Attributes) =>
  b.level === a.level ?
    b.experience - a.experience :
    b.level - a.level;

export const getClassColor = (model: Attributes) => Color.toString(AccessibleClassColors[model.klass]);


export const TestBackgroundColors: Partial<WoWClassColors> = {
  [WoWClassType.druid]: [48, 48, 117],
  [WoWClassType.rogue]: [119, 106, 119],
  [WoWClassType.priest]: [119, 119, 119],
  [WoWClassType.deathKnight]: [238, 145, 161], // [167, 183, 167],
  [WoWClassType.demonHunter]: [183, 183, 167],
}

export const getClassBackground = (klass: WoWClassType) =>
  Color.toString([144, 144, 144]);
  // Color.toString([170, 171, 171]);

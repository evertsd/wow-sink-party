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

// calculated using https://accessible-colors.com/
export const AccessibleClassColors: WoWClassColors = {
  ...OriginalClassColors,
  [WoWClassType.warrior]: [203, 164, 121],
  [WoWClassType.shaman]: [95, 176, 255],
  [WoWClassType.warlock]: [164, 164, 241],
  [WoWClassType.druid]: [255, 142, 41],
  [WoWClassType.deathKnight]: [238, 145, 161],
  [WoWClassType.demonHunter]: [209, 149, 230],
}

export const sortByLevel = (a: Attributes, b: Attributes) =>
  b.level === a.level ?
    b.experience - a.experience :
    b.level - a.level;

export const getClassColor = (model: Attributes) => Color.toString(AccessibleClassColors[model.klass]);

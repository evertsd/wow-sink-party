import * as Base from '../base';

export enum WoWClassType {
  warrior = 'Warrior',
  paladin = 'Paladin',
  hunter = 'Hunter',
  rogue = 'Rogue',
  priest = 'Priest',
  shaman = 'Shaman',
  mage = 'Mage',
  warlock = 'Warlock',
  druid = 'Druid',
  demonHunter = 'Demon Hunter',
  deathKnight = 'Death Knight',
}

export interface Attributes extends Base.Attributes {
  achievementPoints: number;
  klass: WoWClassType;
  experience: number;
  lastLoginTimestamp: number;
  level: number;
  name: string;
}

const Mapper = Base.createAttributeMapper<Attributes>();
export const load = Base.createLoad(Mapper);
export const save = Base.createSave(Mapper);

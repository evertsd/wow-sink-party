import { WoWClassType } from '~/battle-net/character';
import * as Base from '../base';

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

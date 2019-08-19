import { WoWClassType } from '~/battle-net/character';
import * as Base from '../base';

export const ID_DELIMETER = ':';

export interface Attributes extends Base.Attributes {
  klass: WoWClassType;
  experience: number;
  lastLoginTimestamp: number;
  level: number;
  name: string;
}

export type Model = Attributes;

const Mapper = Base.createAttributeMapper<Model>();
export const load = Base.createLoad(Mapper);
export const save = Base.createSave(Mapper);

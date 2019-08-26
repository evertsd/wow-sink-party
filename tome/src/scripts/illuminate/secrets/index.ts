import { WoWClassType } from '~/battle-net/character';
import * as characterLevels from './character-levels.json';
import * as partyTemplates from './party.json';

export interface CharacterTemplate {
  name: string;
  realm: string;
  region: string;
  klass: WoWClassType;
  level: number;
  experience: number;
  lastLoginTimestamp: number;
}

export interface PartyTemplate {
  name: string;
  realm: string;
  region: string;
  characters: { [id: string]: CharacterTemplate };
}

export interface PartyTemplates {
  [id: string]: PartyTemplate;
}

export type CharacterLevelJSON = number;

export interface CharacterLevelsJSON {
  id: string;
  createdAt: number;
  modifiedAt: number;
  characters: { [id: string]: CharacterLevelJSON };
}

export const getParty = () => partyTemplates as unknown as PartyTemplates;
export const getCharacterLevels = () => characterLevels as unknown as CharacterLevelsJSON;

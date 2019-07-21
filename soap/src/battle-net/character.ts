import * as request from 'request-promise';
import * as api from './api';

interface RequestBase {
  access_token: string;
  namespace: string;
  locale: string;
}

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
}

export interface WoWClass {
  key: api.Link;
  name: WoWClassType;
  id: number;
}

export interface Model extends api.ResponseBase {
  id: number;
  achievement_points: number;
  character_class: WoWClass;
  experience: number;
  last_login_timestamp: number;
  level: number;
  name: string;
}

const getQueryParams = <K extends api.RequestBase>({ region, ...qs }: K): RequestBase => ({
  ...qs,
  namespace: `profile-${region}`,
  locale: 'en_US',
});

export const get = async (
  realm: string,
  name: string,
  qs: api.RequestBase,
): Promise<any> => {
  const response = await request.get({
    uri: `${api.getHostname(qs.region)}/profile/wow/character/${realm}/${name}`,
    qs: getQueryParams(qs),
  });

  return JSON.parse(response);
};

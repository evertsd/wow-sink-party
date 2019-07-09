import * as request from 'request-promise';
import { getCredentials } from '~/credentials';

const { CLIENT_ID, CLIENT_SECRET } = getCredentials().battlenet;
export const DEFAULT_REGION = 'us';

export interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface Link { href: string; }
export interface ResponseBase { self: Link; }
export interface RequestBase {
  access_token: string;
  region?: string;
}

export const getHostname = (region: string = DEFAULT_REGION) =>
  `https://${region}.api.blizzard.com`;

export const getAuthHostname = (region: string = DEFAULT_REGION) =>
  `https://${region}.battle.net`;

export const getToken = async (region: string = DEFAULT_REGION): Promise<AccessToken> => {
  const response = await request.get({
    uri: `${getAuthHostname(region)}/oauth/token`,
    qs: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
  });

  return JSON.parse(response) as AccessToken;
};

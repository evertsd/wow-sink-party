import * as QueryString from 'query-string';
import { getCredentials } from '~/credentials';

const { CLIENT_ID, CLIENT_SECRET } = getCredentials().battlenet;

export const getBaseUrl = (region: string = 'us') =>
  `https://${region}.battle.net/oauth/token`;

export const buildUrl = (path: string, params: object, region?: string) =>
  `${getBaseUrl(region)}${path}?${QueryString.stringify(params)}`;

export const getToken = () =>
  fetch(buildUrl('/oauth/token', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials',
  }));

console.info('battle.net token', getToken());

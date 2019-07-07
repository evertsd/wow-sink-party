import * as request from 'request-promise';
import { getCredentials } from '~/credentials';

const { CLIENT_ID, CLIENT_SECRET } = getCredentials().battlenet;

export interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getHostname = (region: string = 'us') =>
  `https://${region}.battle.net`;

export const getToken = () =>
  request.get({
    uri: `${getHostname()}/oauth/token`,
    qs: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
  });

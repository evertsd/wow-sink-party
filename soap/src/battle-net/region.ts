import * as request from 'request-promise';
import * as api from './api';

interface ConnectedRealmsResponse extends api.ResponseBase {
  connected_realms: api.Link[];
}

interface Realm {
  id: number;
  slug: string;
}

interface ConnectedRealmResponse extends api.ResponseBase {
  realms: Realm[];
}

export const getConnected = async (
  accessToken: string,
  region: string = api.DEFAULT_REGION,
): Promise<ConnectedRealmsResponse> => {
  const response = await request.get({
    uri: `${api.getHostname(region)}/data/wow/connected-realm/index`,
    qs: {
      access_token: accessToken,
      namespace: `dynamic-${region}`,
      locale: 'en_US',
    },
  });

  return JSON.parse(response) as ConnectedRealmsResponse;
};

export const get = async (uri: string, accessToken: string) => {
  const response = await request.get({
    uri,
    qs: { access_token: accessToken },
  });

  return JSON.parse(response) as ConnectedRealmResponse;
};

export const getAll = async (
  { connected_realms }: ConnectedRealmsResponse,
  accessToken: string,
) => {
  const responses = await Promise.all(connected_realms.map(link =>
    get(link.href, accessToken),
  ));

  return responses.reduce(
    (arr, response) => arr.concat(response.realms),
    [] as Realm[],
  );
};

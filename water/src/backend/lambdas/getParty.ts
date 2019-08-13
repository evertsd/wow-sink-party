import { Party, Character } from '~/firebase/schema';
import { Response, API_KEY, PATH } from './connection';

interface GetPartyResponse extends Response {
  party: Party.Model;
  characters: Character.Attributes[];
}

export const getParty = async (id: string): Promise<GetPartyResponse>  => {
  const response = await fetch(`${PATH}/party/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });

  const body = await response.json();
  console.info('getParty', body);
  if (!response.ok) {
    throw Error(body.message);
  }

  return body;
}

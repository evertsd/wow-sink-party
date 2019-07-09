import { Character, Party } from '../firebase';

export interface PartyNormalized {
  party: Party.Model;
  characters: Character.Attributes[];
}

export const get = async (id: string): Promise<PartyNormalized> => {
  const party = await Party.get(id);
  const characters = await Promise.all(party.members.map(character =>
    Character.get(character),
  ));

  return { party, characters };
}

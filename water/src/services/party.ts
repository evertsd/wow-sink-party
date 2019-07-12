import { Character, Party } from '../firebase';

export interface PartyNormalized {
  party: Party.Model;
  characters: Character.Attributes[];
}

export const get = async (id: string): Promise<PartyNormalized> => {
  const party = await Party.get(id);
  let characters = await Promise.all(party.members.map(character =>
    Character.get(character),
  ));

  characters = characters.sort(Character.sortByLevel);
  console.info('characters', characters);

  return { party, characters };
}

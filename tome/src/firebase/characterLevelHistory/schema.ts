import firebase from 'firebase-admin';
import * as Base from '../base';
import { Database } from '../connection';

export interface Attributes extends Base.Attributes {
  level: number;
  experience: number;
}

export interface GUIDs extends Base.GUIDs {
  character: Base.GUID;
}

export interface Refs extends Base.Refs {
  character: firebase.firestore.DocumentReference;
}

export interface Model extends GUIDs, Attributes {}

const Mapper: Base.FirebaseMapper<Attributes, GUIDs, Refs> = {
  read: ({ character, ...model }) => Base.Mapper.read(model) as Attributes,
  deserialize: ({ character, ...model }) => ({
    ...Base.Mapper.deserialize(model),
    character: character.id,
  }),
  serialize: ({ character, ...model }, opts) => ({
    ...(Base.Mapper.serialize(model, opts) as Refs),
    character: Database.characters.doc(character),
  }),
};

export const load = Base.createLoad(Mapper);
export const save = Base.createSave(Mapper);

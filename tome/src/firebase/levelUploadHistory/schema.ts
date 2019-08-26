import firebase from 'firebase-admin';
import * as Base from '../base';
import { Database } from '../connection';

type Attributes = Base.Attributes;

export interface GUIDs extends Base.GUIDs {
  characterLevelHistory: Base.GUID[];
}

export interface Refs extends Base.Refs {
  characterLevelHistory: firebase.firestore.DocumentReference[];
}

export interface Model extends GUIDs, Attributes {}

const Mapper: Base.FirebaseMapper<Attributes, GUIDs, Refs> = {
  read: ({ characterLevelHistory, ...model }) => Base.Mapper.read(model) as Attributes,
  deserialize: ({ characterLevelHistory, ...model }) => ({
    ...Base.Mapper.deserialize(model),
    characterLevelHistory: characterLevelHistory.map(clh => clh.id),
  }),
  serialize: ({ characterLevelHistory, ...model }, opts) => ({
    ...(Base.Mapper.serialize(model, opts) as Refs),
    characterLevelHistory: characterLevelHistory.map(clh =>
      Database.characterLevelHistory.doc(clh),
    ),
  }),
};

export const load = Base.createLoad(Mapper);
export const save = Base.createSave(Mapper);

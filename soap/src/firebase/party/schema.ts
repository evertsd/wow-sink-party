import firebase from 'firebase-admin';
import * as Base from '../base';
import { Database } from '../database';

export interface Attributes extends Base.Attributes {
  name: string;
  region: string;
}

interface GUIDs extends Base.GUIDs {
  members: Base.GUID[];
}

interface Refs extends Base.Refs {
  members: firebase.firestore.DocumentReference[];
}

export interface Model extends GUIDs, Attributes {}

const Mapper: Base.FirebaseMapper<Attributes, GUIDs, Refs> = {
  read: ({ members, ...form }) => Base.Mapper.read(form) as Attributes,
  deserialize: ({ members, ...model }) => {
    console.info('Mapper.deserialize', members);
    console.info('Base.Mapper.deserialize(model)', Base.Mapper.deserialize(model));
    console.info('members.map((member) => member.id)', members.map((member) => member.id));

    return {
      ...Base.Mapper.deserialize(model),
      members: members.map((member) => member.id),
    };
  },
  serialize: ({ members, ...model }, opts) => ({
    ...(Base.Mapper.serialize(model, opts) as Refs),
    members: members.map((member) => Database.characters.doc(member)),
  }),
};

export const load = Base.createLoad(Mapper);
export const save = Base.createSave(Mapper);

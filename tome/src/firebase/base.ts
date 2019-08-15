import firebase from 'firebase-admin';
import { Database, now } from './connection';

export type GUID = string;

export interface Attributes {
  id?: GUID;
  createdAt?: firebase.firestore.Timestamp;
  modifiedAt?: firebase.firestore.Timestamp;
}

export interface GUIDs {
  createdBy?: GUID;
  modifiedBy?: GUID;
}

export interface Refs {
  createdBy?: firebase.firestore.DocumentReference;
  modifiedBy?: firebase.firestore.DocumentReference;
}

export interface Model extends Attributes, GUIDs {}

interface ModelFieldOpts {
  user?: GUID;
}

// export type FirebaseSnapshot = firebase.firestore.DocumentSnapshot | firebase.firestore.QueryDocumentSnapshot;
export interface FirebaseSnapshot {
  id: GUID;
  data: () => any;
}

export interface FirebaseMapper<A extends Attributes, G extends GUIDs, R extends Refs> {
  read: (obj: A & (R | G)) => A;
  deserialize: (obj: R) => G;
  serialize: (obj: G, opts?: ModelFieldOpts) => R;
}

export const createSave = <A extends Attributes, G extends GUIDs, R extends Refs>(
  mapper: FirebaseMapper<A, G, R>,
) => (obj: A & G, opts: ModelFieldOpts = {}): A & R => {
  const updates = Object.assign(
    mapper.read(obj),
    mapper.serialize(obj, opts), {
      modifiedAt: now(),
      createdAt: obj.createdAt || now(),
    },
  );

  delete updates.id;
  return updates;
};

export const createLoad = <A extends Attributes, G extends GUIDs, R extends Refs, M extends A & G>(
  mapper: FirebaseMapper<A, G, R>, customLoad?: (doc: FirebaseSnapshot, model: A & G) => M,
) => (doc: FirebaseSnapshot): M => {
  const model = Object.assign(
    { id: doc.id },
    mapper.read(doc.data() as A & R),
    mapper.deserialize(doc.data() as A & R),
  );

  return customLoad ? customLoad(doc, model) : model as M;
};

export const Mapper: FirebaseMapper<Attributes, GUIDs, Refs> = {
  read: ({ createdBy, modifiedBy, ...model }) => model,
  deserialize: (model) => ({
    createdBy: model.createdBy ? model.createdBy.id : undefined,
    modifiedBy: model.modifiedBy ? model.modifiedBy.id : undefined,
  }),
  serialize: (model, opts = {}) => {
    const userGUID = opts.user || model.createdBy;
    const user = userGUID ? Database.users.doc(userGUID) : undefined;

    return user ? { modifiedBy: user, createdBy: user } : {};
  },
};

export const createAttributeMapper = <T>(): FirebaseMapper<T, {}, {}> => ({
  ...Mapper,
  read: (code) => Mapper.read(code) as T,
});

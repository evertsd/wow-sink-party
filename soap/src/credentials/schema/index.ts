import { KEY } from './base';
import * as aws from './aws';
import * as bnet from './battle-net';
import * as firebase from './firebase';
import * as firebaseAdmin from './firebaseAdmin';

export * from './base';

export interface Model {
  [KEY.AWS]: aws.Model;
  [KEY.BATTLENET]: bnet.Model;
  [KEY.FIREBASE]: firebase.Model;
  [KEY.FIREBASE_ADMIN]: firebaseAdmin.Model;
}

export interface Map { [env: string]: Model; }

export { aws, bnet, firebase, firebaseAdmin };

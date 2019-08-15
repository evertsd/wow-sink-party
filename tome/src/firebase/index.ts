import * as firebase from 'firebase-admin';
import * as Character from './character';
import * as Connection from './connection';
import * as Party from './party';

export { Character, Connection, Party };

export const mapTimestampToDate = (timestamp: firebase.firestore.Timestamp) =>
  new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();

import * as firebase from 'firebase-admin';
import * as Character from './character';
import * as CharacterLevelHistory from './characterLevelHistory';
import * as Connection from './connection';
import * as LevelUploadHistory from './levelUploadHistory';
import * as Party from './party';

export { Character, CharacterLevelHistory, Connection, LevelUploadHistory, Party };

export const mapTimestampToDate = (timestamp: firebase.firestore.Timestamp) =>
  new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();

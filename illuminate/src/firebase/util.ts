import firebase from 'firebase/app';
import 'firebase/firestore';

export const mapTimestampToDate = (timestamp: firebase.firestore.Timestamp) =>
  new firebase.firestore.Timestamp(
    timestamp.seconds || (timestamp as unknown as any)._seconds,
    timestamp.nanoseconds || (timestamp as unknown as any)._nanoseconds,
  ).toDate();

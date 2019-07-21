/* Copyright (C) 2018 FacilitationLabs - All Rights Reserved

Portions of this file Copyright (C) 2018 Daniel Eloff - All Rights Reserved
Licensed to FacilitationLabs under the MIT open-source license. You may use, distribute
and modify this code under the terms of the MIT license. You should have
received a copy of the MIT license with this file, it can also be found here:
https://opensource.org/licenses/MIT
*/

import firebase from 'firebase-admin';
import { firebaseAdmin } from '~/credentials/schema';

interface Connection {
  db: firebase.firestore.Firestore;
  characters: firebase.firestore.CollectionReference;
  parties: firebase.firestore.CollectionReference;
  users: firebase.firestore.CollectionReference;
  isInitialized?: boolean;
}

export const Database: Connection = {
  db: {} as firebase.firestore.Firestore,
  characters: {} as firebase.firestore.CollectionReference,
  parties: {} as firebase.firestore.CollectionReference,
  users: {} as firebase.firestore.CollectionReference,
  isInitialized: false,
};

export const initialize = (credentials: firebaseAdmin.Model): Connection =>
  Database.isInitialized ? Database : Object.assign(Database, createDatabase(credentials));

const createDatabase = (credentials: firebaseAdmin.Model) => {
  const account: firebase.ServiceAccount = {
    projectId: credentials.ID,
    privateKey: credentials.PRIVATE_KEY,
    clientEmail: credentials.CLIENT_EMAIL,
  };

  firebase.initializeApp({
    credential: firebase.credential.cert(account),
    databaseURL: credentials.URL,
  });

  const ref = firebase.firestore();

  return {
    ref,
    characters: ref.collection('characters'),
    parties: ref.collection('parties'),
    users: ref.collection('users'),
    isInitialized: true,
  };
};

export const now = () => firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

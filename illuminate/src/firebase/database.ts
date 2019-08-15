/* Copyright (C) 2018 FacilitationLabs - All Rights Reserved

Portions of this file Copyright (C) 2018 Daniel Eloff - All Rights Reserved
Licensed to FacilitationLabs under the MIT open-source license. You may use, distribute
and modify this code under the terms of the MIT license. You should have
received a copy of the MIT license with this file, it can also be found here:
https://opensource.org/licenses/MIT
*/

import firebase from 'firebase/app';
import 'firebase/firestore';
import { credentials } from './credentials';

export enum FirebaseErrorTypes {
  NOT_FOUND = 'NOT_FOUND',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export interface FirebaseError {
  code: FirebaseErrorTypes;
  message: string;
}

export interface FirebaseQuery {
  data?: firebase.firestore.QueryDocumentSnapshot[];
  error?: FirebaseError;
  loading?: boolean;
}

export interface WithQuery {
  query: FirebaseQuery;
}

export interface FirebaseMutation {
  data?: firebase.firestore.DocumentReference | firebase.firestore.DocumentReference[];
  error?: FirebaseError;
  loading?: boolean;
}

export const defaultErrorHandler = (error: Error | FirebaseError) => {
  if (Object.values(FirebaseErrorTypes).includes((error as FirebaseError).code)) {
    return Promise.reject({ error });
  }

  return Promise.reject({ error: { code: FirebaseErrorTypes.UNEXPECTED_ERROR, message: error.message } });
};

export const createQueryError = (message: string) =>
  Promise.reject({ error: { code: FirebaseErrorTypes.UNEXPECTED_ERROR, message } });

const DatabaseFactory = () => {
  firebase.initializeApp({
    apiKey: credentials.KEY,
    authDomain: credentials.DOMAIN,
    databaseURL: credentials.URL,
    projectId: credentials.ID,
    storageBucket: credentials.BUCKET,
    messagingSenderId: credentials.SENDER,
  });

  const db = firebase.firestore();

  return {
    db,
    characters: db.collection('characters'),
    parties: db.collection('parties'),
    users: db.collection('users'),
  };
};

export const Database = DatabaseFactory();

export const auth = firebase.auth;
export const initAuth = auth;

export const now = () => firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

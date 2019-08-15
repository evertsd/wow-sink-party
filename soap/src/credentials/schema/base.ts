export enum KEY {
  AWS = 'aws',
  BATTLENET = 'battlenet',
  FIREBASE = 'firebase',
  FIREBASE_ADMIN = 'firebaseAdmin',
  LAMBDA = 'lambda',
}

export interface Configuration<K> {
  key: KEY;
  secrets: Array<keyof K>;
}

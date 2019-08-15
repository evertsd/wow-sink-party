export enum KEY {
  API_GATEWAY = 'apiGateway',
  AWS = 'aws',
  BATTLENET = 'battlenet',
  FIREBASE = 'firebase',
  FIREBASE_ADMIN = 'firebaseAdmin',
}

export interface Configuration<K> {
  key: KEY;
  secrets: Array<keyof K>;
}

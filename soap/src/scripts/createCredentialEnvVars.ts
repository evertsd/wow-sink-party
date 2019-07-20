import 'module-alias/register';
import * as fs from 'fs';
import * as Credentials from '~/credentials/secrets';

const PATH_TO_ENV = process.argv[2];

const getCredentialEnvs = (credentials: any, parent: string) =>
  Object
    .keys(credentials)
    .map(key => `REACT_APP_${parent}_${key}=${credentials[key]}`)
    .join('\n');

fs.writeFile(PATH_TO_ENV, getCredentialEnvs(Credentials.get().firebase, 'FIREBASE'), err => {
  if (err) { throw err; }

  console.log('Saved env successfully!');
});

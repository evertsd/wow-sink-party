import 'module-alias/register';
import * as fs from 'fs';
import * as path from 'path';
import { getCredentials } from '~/credentials';

const PATH_TO_ENV = process.argv[2];

console.info('path.resolve(PATH_TO_ENV)', PATH_TO_ENV, path.resolve(PATH_TO_ENV));

const getCredentialEnvs = (credentials: any, parent: string) =>
  Object
    .keys(credentials)
    .map(key => `REACT_APP_${parent}_${key}=${credentials[key]}`)
    .join('\n');

fs.writeFile(PATH_TO_ENV, getCredentialEnvs(getCredentials().firebase, 'FIREBASE'), err => {
  if (err) { throw err; }

  console.log('Saved env successfully!');
});

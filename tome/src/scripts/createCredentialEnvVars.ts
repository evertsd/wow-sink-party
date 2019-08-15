import 'module-alias/register';
import * as fs from 'fs';
import * as Credentials from '~/credentials/secrets';

const PATH_TO_ENV = process.argv[2];

const secrets = Credentials.get();

const toKey = (parent: string, child: string) => ([
  'REACT_APP',
  parent.toUpperCase(),
  child.toUpperCase(),
].join('_'));

const getCredentialEnvs = (credentials: any, parent: string): string[] =>
  Object
    .keys(credentials)
    .map(key => `${toKey(parent, key)}=${credentials[key]}`);

const env: string[] = ([] as string[])
  .concat(getCredentialEnvs(secrets.apiGateway, Credentials.KEY.API_GATEWAY))
  .concat(getCredentialEnvs(secrets.firebase, Credentials.KEY.FIREBASE));

fs.writeFile(PATH_TO_ENV, env.join('\n'), err => {
  if (err) { throw err; }

  console.log('Saved env successfully!');
});

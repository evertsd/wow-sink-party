// tslint:disable:no-var-requires
import 'module-alias/register';
import * as path from 'path';
import { getCredentials } from '~/credentials';
import { Aws } from 'aws-cli-js';

const credentials = getCredentials().aws;
const lambdas = require(`~/secrets/${credentials.LAMBDAS}`) || {};
const lambda = lambdas[process.argv[2]];

if (!lambda) {
  throw Error(`No lambda configuration for ${process.argv[2]}`);
}

export const getLambdaBundlePath = (): string =>
  path.resolve(`./lambdas/zip/${lambda}.zip`);

console.log(getLambdaBundlePath());

const aws = new Aws({
  accessKey: credentials.ACCESS_KEY_ID,
  secretKey: credentials.ACCESS_KEY_SECRET,
});

const getCommand = () => `lambda update-function-code \
--profile ${credentials.NAME} \
--function-name ${lambda} \
--zip-file fileb://${getLambdaBundlePath()} \
`;

aws.command(getCommand()).then(data => {
  console.log('data = ', data);
});

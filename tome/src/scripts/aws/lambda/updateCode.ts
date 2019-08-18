import 'module-alias/register';
import * as path from 'path';
import * as Credentials from '~/credentials/secrets';
import * as Configuration from './configuration';
import { initializeCLI } from '../connection';

const credentials = Credentials.get();
const profile = credentials.aws.NAME;
const connection = initializeCLI(credentials.aws);

const lambdaKey = process.argv[2] as Configuration.Lambda;
const lambda = Configuration.map[lambdaKey];

if (!lambda) {
  throw Error(`No lambda configuration for ${process.argv[2]}`);
}

const getLambdaBundlePath = (): string =>
  path.resolve(`./lambdas/${lambdaKey}.zip`);

const getUpdateCodeCommand = () => `lambda update-function-code \
--profile ${profile} \
--function-name ${lambdaKey} \
--zip-file fileb://${getLambdaBundlePath()} \
`;

const updateCode = async () => {
  const updateCodeResponse = await connection.aws.command(getUpdateCodeCommand());

  console.log(updateCodeResponse);
};

updateCode();

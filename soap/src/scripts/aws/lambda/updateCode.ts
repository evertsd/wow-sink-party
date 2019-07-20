// tslint:disable:no-var-requires
import 'module-alias/register';
import * as path from 'path';
import { connection } from '~/aws-cli';
import * as Credentials from '~/credentials/secrets';
import * as Configuration from './configuration';

const credentials = Credentials.get();
const profile = credentials.aws.NAME;
connection.initialize(credentials.aws);

const lambdaKey = process.argv[2] as Configuration.Lambda;
const lambda = Configuration.map[lambdaKey];

if (!lambda) {
  throw Error(`No lambda configuration for ${process.argv[2]}`);
}

export const getLambdaBundlePath = (): string =>
  path.resolve(`./lambdas/zip/${lambdaKey}.zip`);

export const getEnvironment = async (): Promise<string> => {
  const Variables = await Configuration.getEnvironment(lambdaKey);

  return JSON.stringify({ Variables });
};

const getUpdateCodeCommand = () => `lambda update-function-code \
--profile ${profile} \
--function-name ${lambdaKey} \
--zip-file fileb://${getLambdaBundlePath()} \
`;

const getUpdateConfigurationCommand = (environment: string) => `lambda update-function-configuration \
--profile ${profile} \
--function-name ${lambdaKey} \
--environment '${environment}' \
`;

export const updateFunction = async () => {
  const updateCodeResponse = await connection.aws.command(getUpdateCodeCommand());

  try {
    const environment = await getEnvironment();
    const updateEnvironmentResponse = await connection.aws.command(getUpdateConfigurationCommand(environment));

    console.log(updateEnvironmentResponse);
  } catch (e) {
    console.error('Could not update environment', e);
  }

  console.log(updateCodeResponse);
};

updateFunction();

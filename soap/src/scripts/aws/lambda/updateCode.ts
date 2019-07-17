// tslint:disable:no-var-requires
import 'module-alias/register';
import { Aws } from 'aws-cli-js';
import * as path from 'path';
import * as Credentials from '~/credentials';
import * as Configuration from './configuration';

const credentials = Credentials.get().aws;
const lambdaKey = process.argv[2] as Configuration.Lambda;
const lambda = Configuration.map[lambdaKey];

if (!lambda) {
  throw Error(`No lambda configuration for ${process.argv[2]}`);
}

export const getLambdaBundlePath = (): string =>
  path.resolve(`./lambdas/zip/${lambdaKey}.zip`);

export const getEnvironment = (): string =>
  JSON.stringify({ Variables: Configuration.getEnvironment(lambdaKey) });

const aws = new Aws({
  accessKey: credentials.ACCESS_KEY_ID,
  secretKey: credentials.ACCESS_KEY_SECRET,
});

const getUpdateCodeCommand = () => `lambda update-function-code \
--profile ${credentials.NAME} \
--function-name ${lambdaKey} \
--zip-file fileb://${getLambdaBundlePath()} \
`;

const getUpdateConfigurationCommand = () => `lambda update-function-configuration \
--profile ${credentials.NAME} \
--function-name ${lambdaKey} \
--environment '${getEnvironment()}' \
`;

export const updateFunction = async () => {
  const updateCodeResponse = await aws.command(getUpdateCodeCommand());
  const updateEnvironmentResponse = await aws.command(getUpdateConfigurationCommand());

  console.log(updateCodeResponse);
  console.log(updateEnvironmentResponse);
};

updateFunction();

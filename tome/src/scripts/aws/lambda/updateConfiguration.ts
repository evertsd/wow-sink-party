// tslint:disable:no-var-requires
import 'module-alias/register';
import * as Credentials from '~/credentials/secrets';
import * as Configuration from './configuration';
import { initializeCLI, initializeSDK } from '../connection';

const credentials = Credentials.get();
const connection = initializeCLI(credentials.aws);
const profile = credentials.aws.NAME;
initializeSDK(credentials.aws);

const lambdaKey = process.argv[2] as Configuration.Lambda;
const lambda = Configuration.map[lambdaKey];

if (!lambda) {
  throw Error(`No lambda configuration for ${process.argv[2]}`);
}

const getEnvironment = async (): Promise<string> => {
  const Variables = await Configuration.getEnvironment(lambdaKey);

  return JSON.stringify({ Variables });
};

const getUpdateConfigurationCommand = (environment: string) => `lambda update-function-configuration \
--profile ${profile} \
--function-name ${lambdaKey} \
--environment '${environment}' \
--handler ${lambdaKey}/index.handler
`;

const updateConfiguration = async () => {
  const environment = await getEnvironment();
  const updateEnvironmentResponse = await connection.aws.command(getUpdateConfigurationCommand(environment));

  console.log(updateEnvironmentResponse);
};

updateConfiguration();

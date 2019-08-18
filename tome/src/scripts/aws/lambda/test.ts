import 'module-alias/register';
import * as Credentials from '~/credentials/secrets';
import * as getParty from '~/lambdas/getParty';
import * as Configuration from './configuration';
import { initializeSDK } from '../connection';

const credentials = Credentials.get();
const lambdaKey = Configuration.Lambda.getParty; // process.argv[2] as Configuration.Lambda
initializeSDK(credentials.aws);

const testLambda = async () => {
  const environment = await Configuration.getEnvironment(lambdaKey);
  Object.assign(process.env, environment);

  return await getParty.handler({
    pathParameters: { id: '61472496-4028-4fe3-ad91-4307ca1e0bbe' },
  });
};

testLambda().then(console.log);

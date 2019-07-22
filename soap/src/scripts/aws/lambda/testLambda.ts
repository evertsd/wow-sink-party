import 'module-alias/register';
import * as Credentials from '~/credentials/secrets';
import * as getParty from '~/lambdas/getParty';
import { environment } from '~/secrets/environment';
import { initializeSDK } from '../connection';

const credentials = Credentials.get();
initializeSDK(credentials.aws);

const testLambda = async () => {
  Object.assign(process.env, environment);

  await getParty.handler({
    pathParameters: { id: '71961c28-ceaa-4b0f-bb13-aa4249cc7006' },
  });
};

testLambda().then(console.log);

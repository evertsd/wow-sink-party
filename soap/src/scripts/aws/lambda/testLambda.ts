import 'module-alias/register';
import * as Credentials from '~/credentials/secrets';
import * as getParty from '~/lambdas/getParty';
import { environment } from '~/secrets/environment';
import { initializeSDK } from '../connection';

const credentials = Credentials.get();
initializeSDK(credentials.aws);

const NURADAS_NERDS = '71961c28-ceaa-4b0f-bb13-aa4249cc7006';
// const ANDERSONS_ALLIES = '61472496-4028-4fe3-ad91-4307ca1e0bbe';

const testLambda = async () => {
  Object.assign(process.env, environment);

  return await getParty.handler({
    pathParameters: { id: NURADAS_NERDS },
  });
};

testLambda().then(console.log);

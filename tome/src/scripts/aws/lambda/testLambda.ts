import 'module-alias/register';
import * as Credentials from '~/credentials/secrets';
import * as getParty from '~/lambdas/getParty';
import { environment } from '~/secrets/environment';
import { initializeSDK } from '../connection';

const credentials = Credentials.get();
initializeSDK(credentials.aws);

const testLambda = async () => {
  Object.assign(process.env, environment);

  return await getParty.handler({
    pathParameters: { id: '61472496-4028-4fe3-ad91-4307ca1e0bbe' },
  });
};

testLambda().then(console.log);

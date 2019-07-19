// tslint:disable:no-var-requires
import { Aws } from 'aws-cli-js';
import * as Credentials from '~/aws/credentials';

interface Connection {
  aws: Aws;
  credentials: Credentials.Model;
  initialize: (secrets: Credentials.Model) => void;
}

export const awsConnection: Connection = {
  aws: new Aws(),
  credentials: {} as Credentials.Model,
  initialize: () => { throw Error('Uninitialized'); },
};

const initialize = (credentials: Credentials.Model) => {
  Object.assign(awsConnection, {
    aws: new Aws({
      accessKey: credentials.ACCESS_KEY_ID,
      secretKey: credentials.ACCESS_KEY_SECRET,
    }),
    credentials,
  });
};

awsConnection.initialize = initialize;

export const connection = awsConnection;

import { Aws } from 'aws-cli-js';
import { aws } from '~/credentials/schema';

interface Connection {
  aws: Aws;
  credentials: aws.Model;
  initialize: (secrets: aws.Model) => Connection;
}

export const awsConnection: Connection = {
  aws: new Aws(),
  credentials: {} as aws.Model,
  initialize: () => { throw Error('Uninitialized'); },
};

const initialize = (credentials: aws.Model): Connection =>
  Object.assign(awsConnection, {
    aws: new Aws({
      accessKey: credentials.ACCESS_KEY_ID,
      secretKey: credentials.ACCESS_KEY_SECRET,
    }),
    credentials,
  });

awsConnection.initialize = initialize;

export const connection = awsConnection;

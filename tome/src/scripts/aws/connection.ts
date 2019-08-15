import * as AWS from 'aws-sdk';
import { connection } from '~/aws-cli';
import { aws } from '~/credentials/schema';

export const initializeSDK = (credentials: aws.Model) => {
  AWS.config.region = credentials.REGION;

  AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: credentials.NAME,
  });
};

export const initializeCLI = (credentials: aws.Model) =>
  connection.initialize(credentials);

import * as AWS from 'aws-sdk';
import { connection } from '~/aws-cli';
import { aws } from '~/credentials/schema';

export const initializeSDK = (credentials: aws.Model) => {
  AWS.config.accessKeyId = credentials.ACCESS_KEY_ID;
  AWS.config.secretAccessKey = credentials.ACCESS_KEY_SECRET;
  AWS.config.region = credentials.REGION;
};

export const initializeCLI = (credentials: aws.Model) =>
  connection.initialize(credentials);

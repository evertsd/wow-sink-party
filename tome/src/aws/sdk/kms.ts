import * as AWS from 'aws-sdk';

const BUFFER_ENCODING = 'base64';

export const createEncrypt = (KeyId: string) => {
  const kms = new AWS.KMS();

  return async (Plaintext: string): Promise<string> =>
    new Promise((resolve, reject) =>
      kms.encrypt({ KeyId, Plaintext }, (err, response) => {
        if (err) { return reject(err); }
        if (!response.CiphertextBlob) { return reject('CiphrtextBlob is undefiend'); }

        const buffer = Buffer.from(response.CiphertextBlob as string);
        resolve(buffer.toString(BUFFER_ENCODING));
      }),
    );
};

export const createDecrypt = () => {
  const kms = new AWS.KMS();

  return async (variable: string): Promise<string> =>
    new Promise((resolve, reject) =>
      kms.decrypt({ CiphertextBlob: Buffer.from(variable, BUFFER_ENCODING) }, (err, data) => {
        if (err) { return reject(err); }

        resolve(String(data.Plaintext));
      }),
    );
};

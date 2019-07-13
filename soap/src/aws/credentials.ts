import { IAWSCredentials } from '~/credentials';

const SPLIT_CREDENTIALS_REGEX = /\n(?=\[.*\])/;

interface AWSCredential {
  [key: string]: string;
  name: string;
}

export const fromSecret = (secret: IAWSCredentials): AWSCredential => ({
  name: secret.NAME,
  aws_access_key_id: secret.ACCESS_KEY_ID,
  aws_secret_access_key: secret.ACCESS_KEY_SECRET,
  aws_region: secret.REGION,
  output: secret.OUTPUT,
});

export const readFile = (file: string): AWSCredential[] =>
  file
    .split(SPLIT_CREDENTIALS_REGEX)
    .map(mapBlobToAWSCredential);

export const toFile = (credentials: AWSCredential[]) =>
  `${credentials.map(mapAWSCredentialToBlob).join('\n\n')}\n`;

const mapNameAttributeToName = (nameBlob: string) =>
  nameBlob.replace(/\[|\]/gi, '');

const mapBlobToAWSCredential = (blob: string): AWSCredential => {
  const attributes = blob.split(/\n/);
  const defaultCredential: AWSCredential = {
    name: mapNameAttributeToName(attributes[0]),
  };

  return attributes.slice(1).reduce((credential, attribute) => {
    if (attribute.includes('=')) {
      const [key, value] = attribute.split(/\s?=\s?/);

      credential[key] = value;
    }

    return credential;
  }, defaultCredential);
};

const mapAWSCredentialToBlob = ({ name, ...attributes }: AWSCredential) =>
  Object.keys(attributes)
    .reduce((blob, key) => `${blob}\n${key} = ${attributes[key]}`, `[${name}]`);

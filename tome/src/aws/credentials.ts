const SPLIT_CREDENTIALS_REGEX = /\n(?=\[.*\])/;

interface Profile {
  [key: string]: string;
  name: string;
}

export interface Model {
  NAME: string;
  ACCESS_KEY_ID: string;
  ACCESS_KEY_SECRET: string;
  BUCKET: string;
  REGION: string;
  OUTPUT: string;
  KMS: string;
}

export const fromSecret = (secret: Model): Profile => ({
  name: secret.NAME,
  aws_access_key_id: secret.ACCESS_KEY_ID,
  aws_secret_access_key: secret.ACCESS_KEY_SECRET,
  aws_region: secret.REGION,
  output: secret.OUTPUT,
});

export const readFile = (file: string): Profile[] =>
  file
    .split(SPLIT_CREDENTIALS_REGEX)
    .map(mapBlobToProfile);

export const toFile = (profiles: Profile[]) =>
  `${profiles.map(mapProfileToBlob).join('\n\n')}\n`;

const mapNameAttributeToName = (nameBlob: string) =>
  nameBlob.replace(/\[|\]/gi, '');

const mapBlobToProfile = (blob: string): Profile => {
  const attributes = blob.split(/\n/);

  return attributes.slice(1).reduce((profile: Profile, attribute) => {
    if (attribute.includes('=')) {
      const [key, value] = attribute.split(/\s?=\s?/);

      profile[key] = value;
    }

    return profile;
  }, { name: mapNameAttributeToName(attributes[0]) });
};

const mapProfileToBlob = ({ name, ...attributes }: Profile) =>
  Object.keys(attributes)
    .reduce((blob, key) => `${blob}\n${key} = ${attributes[key]}`, `[${name}]`);

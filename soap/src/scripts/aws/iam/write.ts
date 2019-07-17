import 'module-alias/register';
import * as fs from 'fs';
import * as AWS from '~/aws';
import * as Credentials from '~/credentials';

const readFile = (path: string): Promise<string> =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) =>
      err ? reject(err) : resolve(data.toString('utf8')),
    ),
  );

export const writeFile = (path: string, file: string): Promise<void> =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, file, err => err ? reject(err) : resolve()),
  );

const addIAM = async (path: string) => {
  const file = await readFile(path);
  const credentials = AWS.Credentials.readFile(file);
  const iam = AWS.Credentials.fromSecret(Credentials.get().aws);

  const index = credentials.findIndex(({ name }) => name === iam.name);

  index < 0 ?
    credentials.push(iam) :
    credentials[index] = iam;

  await writeFile(path, AWS.Credentials.toFile(credentials));
};

addIAM(process.argv[2]);

import 'module-alias/register';
import * as zip from 'bestzip';
import * as fs from 'fs';
import * as path from 'path';

const PATH_TO_LAMBDAS = path.resolve('lambdas');

const zipBundles = async () => {
  const bundles = await getBundles();

  await bundles.map(zipBundle);
};

const getBundles = async (): Promise<string[]> =>
  new Promise((resolve, reject) =>
    fs.readdir(`${PATH_TO_LAMBDAS}/bundles`, (err, files) => {
      if (err) { return reject(err); }

      return resolve(files.map(filename => filename.split('.')[0]));
    }),
  );

const zipBundle = async (filename: string) =>
  await zip({
    source: '*',
    destination: `../../zip/${filename}.zip`,
    cwd: `${PATH_TO_LAMBDAS}/bundles/${filename}/`,
  });

zipBundles();

import 'module-alias/register';
import * as zip from 'bestzip';
import * as fs from 'fs';
import * as path from 'path';

const PATH_TO_LAMBDAS = path.resolve('lambdas');
const FILE_BLACKLIST = ['.DS_Store'];

const zipBundles = async () => {
  const bundles = await getBundles();

  await bundles.map(zipBundle);
};

const getBundles = async (): Promise<string[]> =>
  new Promise((resolve, reject) =>
    fs.readdir(`${PATH_TO_LAMBDAS}/bundles`, (err, files) => {
      if (err) { return reject(err); }
      console.info('getBundles, files', files);
      return resolve(files.filter(filename => !FILE_BLACKLIST.includes(filename)));
    }),
  );

const zipBundle = async (filename: string) =>
  await zip({
    source: '*',
    destination: `../../zip/${filename}.zip`,
    cwd: `${PATH_TO_LAMBDAS}/bundles/${filename}/`,
  });

zipBundles();

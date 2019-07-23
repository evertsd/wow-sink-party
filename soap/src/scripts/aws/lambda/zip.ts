import 'module-alias/register';
import * as zip from 'bestzip';
import * as path from 'path';

const PATH_TO_LAMBDAS = path.resolve('.webpack');
const FUNCTION_WHITELIST = ['getParty'];

const zipBundles = async () =>
  Promise.all(FUNCTION_WHITELIST.map(zipBundle));

const zipBundle = async (filename: string) =>
  await zip({
    source: [`${filename}/*`, 'node_modules/*', 'package.json', 'package-lock.json'],
    destination: `../../lambdas/${filename}.zip`,
    cwd: `${PATH_TO_LAMBDAS}/service/`,
  });

zipBundles();

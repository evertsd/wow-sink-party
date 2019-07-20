import { bnet } from '~/credentials/schema';
import { toEnvironment } from './base';

export const getEnvironment = async (secrets: bnet.Model) =>
  toEnvironment<bnet.Model>(secrets, bnet.configuration);

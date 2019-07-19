import { Credentials } from '~/battle-net/api';
import { toEnvironment, Environment, KEY } from './base';

export const getEnvironment = async (secrets: Credentials): Promise<Environment> =>
  toEnvironment(secrets as unknown as Environment, ['CLIENT_SECRET'], KEY.bnet);

import 'module-alias/register';
import { getToken } from '../api';

const list = async () => {
  const token = await getToken();

  console.info('getToken.response', token);
};

list();

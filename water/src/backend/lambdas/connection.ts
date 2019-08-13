export interface Response {
  status: number;
}

export const PATH = [
  process.env.REACT_APP_LAMBDA_API_PATH,
  process.env.REACT_APP_LAMBDA_API_ENV,
].join('/');

export const API_KEY = process.env.REACT_APP_LAMBDA_API_KEY || '';

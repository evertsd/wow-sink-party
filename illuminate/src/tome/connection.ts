export interface Response {
  status: number;
}

export const PATH = process.env.REACT_APP_APIGATEWAY_PATH;
export const API_KEY = process.env.REACT_APP_APIGATEWAY_KEY || '';

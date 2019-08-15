export const ok = (obj: object, statusCode: number = 200) =>
  ({ headers, statusCode, body: JSON.stringify(obj) });

export const unexpectedError = (e: Error, statusCode: number = 500) =>
  ({ headers, statusCode, body: JSON.stringify({ message: e.message }) });

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

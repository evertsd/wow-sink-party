export const ok = (obj: object, statusCode: number = 200) =>
  ({ statusCode, body: JSON.stringify(obj) });

export const unexpectedError = (e: Error, statusCode: number = 500) =>
  ({ statusCode, body: JSON.stringify({ message: e.message }) });

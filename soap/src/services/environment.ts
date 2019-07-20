export type Tuple = [string, string];
export interface Model<K = (string | undefined)> { [key: string]: K; }

export const flattenKey = (...keys: string[]): string => keys.map(k => k.toUpperCase()).join('_');

export const reduceTuples = (environment: Model, [key, value]: Tuple): Model => {
  environment[key] = value;

  return environment;
};

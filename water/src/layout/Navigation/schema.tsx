import { RouteProps } from 'react-router';

export interface Scene {
  key: string;
  Routes: RouteProps[];
  Actions?: RouteProps[];
}

export type CreateScenes<P = any> = (props: P) => Scene[];

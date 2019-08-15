import { ClosePartyView, PartyList, PartyView } from '~/scenes/Party';
import { paths } from '~/paths';
import { Scene } from './schema';

export const scene: Scene = {
  key: 'party',
  Actions: [
    { path: `${paths.PARTY}/:id`, component: ClosePartyView, exact: true },
  ],
  Routes: [
    { path: paths.PARTY, component: PartyList, exact: true },
    { path: `${paths.PARTY}/:id`, component: PartyView, exact: true },
  ],
};

import { connect, MapStateToProps, Party, Selector } from '~/store/connect';

interface RequiredProps { party: Party.Model; }
interface StateProps { sortMembers: Selector.SortMember.IdSort; }
export interface MemberProps extends RequiredProps, StateProps {}

const mapStateToSorter: MapStateToProps<StateProps, RequiredProps> =
  (state) => ({ sortMembers: Selector.SortMember.create(state) });

export const connectSorter = connect(mapStateToSorter);

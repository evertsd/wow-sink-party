import { connect, MapStateToProps, Party, Selector } from '~/store/connect';

interface RequiredProps { party: Party.Model; }
interface StateProps { members: string[]; }
export interface MemberProps extends RequiredProps, StateProps {}

const mapStateToMembers: MapStateToProps<StateProps, RequiredProps> =
  (state, { party }) => {
    const members = party.members.sort(Selector.SortMember.create(state));

    return { members };
  };

export const connectMembers = connect(mapStateToMembers);

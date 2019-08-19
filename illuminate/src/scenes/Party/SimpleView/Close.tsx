import * as React from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Previous } from '~/assets/icons';
import { paths } from '~/paths'

type Props = RouteComponentProps<any>;

export const Component: React.FC<Props> = (props) =>
  <Previous className="navbar-action" onClick={() => onBack(props)} />;

const onBack = ({ history }: Props) => {
  const referrer = document.referrer.replace(window.location.origin, '');

  referrer === paths.PARTY ?
    history.goBack() :
    history.push(paths.PARTY);
};

export const ClosePartyView = withRouter(Component);

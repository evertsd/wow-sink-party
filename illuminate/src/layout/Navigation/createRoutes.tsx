import * as React from 'react';
import { RouteProps } from 'react-router';
import { CreateScenes } from './schema';
import { Redirect, Route, Switch } from "react-router-dom";

export const createRoutes = (createScenes: CreateScenes, defaultPath?: string) =>
  (props: any) => {
    const routes = React.useRef(
      createScenes(props)
        .reduce((r: RouteProps[], { Routes }) => r.concat(Routes), [])
        .map((routeProps, i) => <Route key={`route-${i}`} {...routeProps} />)
    );

    return (
      <Switch>
        {routes.current}

        {defaultPath ? <Redirect from="*" to={defaultPath} key="route-default" /> : null}
      </Switch>
    );
  };

export const createActions = (createScenes: CreateScenes) =>
  (props: any) => {
    const routes = React.useRef(
      createScenes(props)
        .reduce((r: RouteProps[], { Actions }) => r.concat(Actions || []), [])
        .map((routeProps, i) => <Route key={`route-${i}`} {...routeProps} />)
    );

    return (
      <Switch>
        {routes.current}
      </Switch>
    );
  };

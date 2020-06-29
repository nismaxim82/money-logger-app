import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (route: any) => {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={(props: any) => {
        if (Array.isArray(route.components)) {
          return route.components.map((Component: any, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <Component key={index} {...props} routes={route.routes} />
          ));
        }
        return <route.components {...props} routes={route.routes} />;
      }}
    />
  );
};

export default RouteWithSubRoutes;

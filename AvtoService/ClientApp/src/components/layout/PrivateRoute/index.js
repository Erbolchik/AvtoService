import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Context } from '../../../common';

import jwt from 'jwt-decode';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { token } = useContext(Context);

  const grantPermission = (props) => {
    if (token) {
      const persistedToken = jwt(token);
      if (Date.now() >= persistedToken.exp * 1000) {
        return (
          <Redirect
            to={{
              pathname: '/error/sessionexpired',
              state: { from: props.location },
            }}
          />
        );
      }
      return <Component {...props} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      );
    }
  };

  return <Route {...rest} render={(props) => grantPermission(props)} />;
};
export default PrivateRoute;

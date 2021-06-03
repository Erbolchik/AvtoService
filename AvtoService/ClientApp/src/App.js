import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import { Context } from './common';
import AppLayout from './components/layout/index';
import { Login, Registration } from './pages';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Context.Provider value={{ token, setToken }}>
      <Switch>
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/registration'} component={Registration} />
        <AppLayout />;
      </Switch>
    </Context.Provider>
  );
};

export default App;

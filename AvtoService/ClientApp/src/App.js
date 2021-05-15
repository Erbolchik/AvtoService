import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import { Context } from './common';
import AppLayout from './components/layout/index';
import { Login } from './pages';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Context.Provider value={(token, setToken)}>
      <Switch>
        <Route path="/login" component={Login} />
        <AppLayout />;
      </Switch>
    </Context.Provider>
  );
};

export default App;

import React from 'react';
import NavBar from './components/ui/navBar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Error404 from './components/common/page/error404';
import Login from './layouts/login';
const App = () => {
  return (
    <>
      <NavBar />

      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/404' component={Error404} />
        <Redirect to='/404' />
      </Switch>

    </>
  );
};

export default App;

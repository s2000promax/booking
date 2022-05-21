import React, { useEffect, useState } from 'react';
import NavBar from './components/ui/navBar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Error404 from './components/common/page/error404';
import Login from './layouts/login';
import api from './api';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [clients, setClients] = useState([]);
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    api.countries.fetchCountries().then(countriesData => setCountries(countriesData.data));
    api.clients.fetchAll().then(clientsData => setClients(clientsData));
    api.customers.fetchAll().then(customersData => setCustomers(customersData));
  }, []);
  console.log(countries);
  console.log(clients);
  console.log(customers);

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

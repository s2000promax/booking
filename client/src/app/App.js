import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';
import NavBar from './components/ui/navBar';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import AppLoader from './components/ui/hoc/appLoader';
import hotelPage from './components/page/hotelPage';
import AddHotelForm from './components/ui/addHotelForm';
import Footer from './components/common/footer';

function App() {

  return (
        <div>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path='/users/:userId?/:edit?'
                        component={Users}
                    />
                    <ProtectedRoute path='/hotels/:hotelId?' component={hotelPage} />
                    <ProtectedRoute path='/addnewhotel/:userId?' component={AddHotelForm} />
                    <Route path='/login/:type?' component={Login} />
                    <Route path='/logout' component={LogOut} />
                    <Route path='/' exact component={Main} />
                    <Redirect to='/' />
                </Switch>
            </AppLoader>
            <ToastContainer />
          <div>
            <Footer/>
          </div>
        </div>
    );
}

export default App;

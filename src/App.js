import { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './user/pages/Users';
import Auth from './user/pages/Auth';
import UserSnaps from './snap/pages/UserSnaps';
import NewSnap from './snap/pages/NewSnap';
import UpdateSnap from './snap/pages/UpdateSnap';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/snaps' exact>
          <UserSnaps />
        </Route>
        <Route path='/snaps/new' exact>
          <NewSnap />
        </Route>
        <Route path='/snaps/:snapId'>
          <UpdateSnap></UpdateSnap>
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }

  if (!isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/snaps' exact>
          <UserSnaps />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

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
  // NOTE ISLOGGEDIN IS REPLACED BY WHETHER TOKEN EXISTS
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
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

  if (!token) {
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
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

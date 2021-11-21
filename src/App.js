import { useState, useCallback, useEffect } from 'react';
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

let logoutTimer;

const App = () => {
  // NOTE ISLOGGEDIN IS REPLACED BY WHETHER TOKEN EXISTS
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    // REACT WILL BATCH ALL THE FOLLOWING SET STATE TOGETHER
    setToken(token);
    setUserId(uid);

    // NOTE STORE TOKEN IN LOCAL STORAGE
    // PASS EXISTING EXPIRATION DATE OR GENERATE A DATE OBJECT: NOW + 1 HOUR
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        // ISO STRING CAN BE CONVERTED BACK TO A DATE OBJECT
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    // REMORE USERDATA STORED LOCALLY
    localStorage.removeItem('userData');
  }, []);

  // IMPLEMENT AUTO-LOGOUT
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    }
    if (!token || !tokenExpirationDate) {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // IMPLEMENT AUTO-LOGIN
  useEffect(() => {
    // TODO(OPTIONAL) FIX 'HICCUP' WHEN FIRST RENDER IS NOT LOGGED IN
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expirationDate)
      );
    }
  }, [login]);

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

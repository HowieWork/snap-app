import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './shared/components/Footer/Footer';
import Users from './user/pages/Users';
import Auth from './user/pages/Auth';
import UserSnaps from './snap/pages/UserSnaps';
import NewSnap from './snap/pages/NewSnap';
import UpdateSnap from './snap/pages/UpdateSnap';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();

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
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

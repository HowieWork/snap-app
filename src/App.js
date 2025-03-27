import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './shared/components/Footer/Footer';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import Users from './user/pages/Users';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

// CODE-SPLITTING
const Auth = React.lazy(() => import('./user/pages/Auth'));
const UserSnaps = React.lazy(() => import('./snap/pages/UserSnaps'));
const RandomSnap = React.lazy(() => import('./snap/pages/RandomSnap'));
const SearchSnaps = React.lazy(() => import('./snap/pages/SearchSnaps'));
const NewSnap = React.lazy(() => import('./snap/pages/NewSnap'));
const UpdateSnap = React.lazy(() => import('./snap/pages/UpdateSnap'));

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
        <Route path='/random' exact>
          <RandomSnap />
        </Route>
        <Route path='/search/:keyword' exact>
          <SearchSnaps />
        </Route>
        <Route path='/snaps/new' exact>
          <NewSnap />
        </Route>
        <Route path='/snaps/:snapId'>
          <UpdateSnap />
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
        <Route path='/random' exact>
          <RandomSnap />
        </Route>
        <Route path='/search/:keyword' exact>
          <SearchSnaps />
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
      {/* ADDED BASENAME FOR GITHUB SPA SUPPORT FIX */}
      <Router basename='/snap-app'>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className='center-text'>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

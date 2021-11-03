import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './user/pages/Users';
import UserSnaps from './snap/pages/UserSnaps';
import NewSnap from './snap/pages/NewSnap';
import UpdateSnap from './snap/pages/UpdateSnap';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
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
      </main>
    </Router>
  );
};

export default App;

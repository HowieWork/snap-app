import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../FormElements/Button';
import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className='center-flex-row medium-gap nav-links'>
      <li>
        <NavLink to='/' exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/snaps`}>My Snaps</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to='/snaps/new'>Add Snap</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          {/* <NavLink to='/auth'>Get Started</NavLink>
           */}
          <Button to='/auth' type='button' size='medium' secondary>
            Get Started
          </Button>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button type='button' size='medium' secondary onClick={auth.logout}>
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;

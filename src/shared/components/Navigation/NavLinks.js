import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to='/u1/snaps'>My Snaps</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to='/snaps/new'>Add Snap</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='/auth'>Get Started</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;

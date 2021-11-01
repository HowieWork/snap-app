import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = () => {
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to='/u1/snaps'>My Snaps</NavLink>
      </li>
      <li>
        <NavLink to='/snaps/new'>Add Snap</NavLink>
      </li>
      <li>
        <NavLink to='/auth'>Get Started</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;

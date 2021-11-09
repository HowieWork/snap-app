import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import NavLinks from './NavLinks';

import './MainNavigation.css';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <Fragment>
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks />
        </nav>
      </SideDrawer>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <MainHeader>
        <h1 className='main-navigation__title'>
          <Link to='/'>Snap</Link>
        </h1>
        <nav className='main-navigation__links'>
          <NavLinks />
        </nav>
        <button
          className='main-navigation__menu-btn'
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;

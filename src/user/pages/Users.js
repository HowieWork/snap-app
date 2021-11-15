import { Fragment } from 'react';

import Hero from '../../shared/components/Hero/Hero';
import UsersList from '../components/UsersList';

const Users = () => {
  // Fetch USERS data
  const DUMMY_USERS = [
    {
      id: 'u1',
      name: 'Sam Skylar',
      motto: 'I love living in the city!',
      email: 'sam@email.com',
      password: 'samlovessnap',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      snapCount: 3,
    },
    {
      id: 'u2',
      name: 'Sam Skylar',
      motto: 'I love living in the city! I love living in the city! I love!',
      email: 'sam@email.com',
      password: 'samlovessnap',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      snapCount: 3,
    },
    {
      id: 'u3',
      name: 'Sam Skylar',
      motto: 'I love living in the city!',
      email: 'sam@email.com',
      password: 'samlovessnap',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      snapCount: 3,
    },
    {
      id: 'u4',
      name: 'Sam Skylar',
      motto: 'I love living in the city!',
      email: 'sam@email.com',
      password: 'samlovessnap',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      snapCount: 3,
    },
  ];

  return (
    <Fragment>
      <Hero />
      <UsersList items={DUMMY_USERS}></UsersList>
    </Fragment>
  );
};

export default Users;

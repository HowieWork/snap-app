import { Fragment, useState, useEffect } from 'react';
import Hero from '../../shared/components/Hero/Hero';
import Features from '../../shared/components/Features/Features';
import UsersList from '../components/UsersList';
import CallToAction from '../../shared/components/CallToAction/CallToAction';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    // FETCH USERS
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Hero />
      <Features />
      {isLoading && (
        <div className='center-flex-row'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      <CallToAction />
    </Fragment>
  );
};

export default Users;

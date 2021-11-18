import { Fragment, useState, useEffect } from 'react';
// TODO ADD HERO SECTION TO HOMEPAGE
// import Hero from '../../shared/components/Hero/Hero';
import UsersList from '../components/UsersList';
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
          'http://localhost:8000/api/users'
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center-flex-row'>
          <LoadingSpinner />
        </div>
      )}
      {/* TODO ADD HERO SECTION TO HOMEPAGE*/}
      {/* <Hero /> */}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </Fragment>
  );
};

export default Users;

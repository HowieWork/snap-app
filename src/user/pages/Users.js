import { Fragment, useState, useEffect } from 'react';
// TODO ADD HERO SECTION TO HOMEPAGE
// import Hero from '../../shared/components/Hero/Hero';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    // Fetch USERS data
    const sendRequest = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:8000/api/users');
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedUsers(responseData.users);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
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

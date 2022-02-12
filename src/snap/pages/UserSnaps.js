import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { useHttpClient } from '../../shared/hooks/http-hook';
import SnapList from '../components/SnapList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Avatar from '../../shared/components/UIElements/Avatar';

import './UserSnaps.css';

const UserSnaps = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedSnaps, setLoadedSnaps] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    // 1) FETCH USER
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
        );
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();

    // 2) FETCH SNAPS
    // http://localhost:8000/api/snaps/user/:uid
    const fetchSnaps = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/snaps/user/${userId}`
        );
        setLoadedSnaps(responseData.snaps);
      } catch (err) {}
    };
    fetchSnaps();
  }, [sendRequest, userId]);

  const snapDeletedHandler = (deletedSnapId) => {
    setLoadedSnaps((prevSnaps) =>
      prevSnaps.filter((snap) => snap.id !== deletedSnapId)
    );
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center-text'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && (
        <div className='user-info center-flex-column extra-small-gap'>
          <div className='user-info__image'>
            <Avatar
              image={`${process.env.REACT_APP_ASSET_URL}/${loadedUser.image}`}
            />
          </div>
          <p className='user-info__name'>{loadedUser.name}</p>
          <p className='user-info__text'>{loadedUser.motto}</p>
        </div>
      )}
      {!isLoading && loadedSnaps && (
        <SnapList items={loadedSnaps} onDeleteSnap={snapDeletedHandler} />
      )}
      ;
    </Fragment>
  );
};

export default UserSnaps;

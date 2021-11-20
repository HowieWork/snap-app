import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { useHttpClient } from '../../shared/hooks/http-hook';
import SnapList from '../components/SnapList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

// FIXME DELETE DUMMY_SNAPS IN THE END
// const DUMMY_SNAPS = [
//   {
//     id: 's1',
//     title: 'Guggenheim',
//     description:
//       'The unique architecture of the space, with its spiral ramp riding to a domed skylight, continues to thrill visitors and provide a unique forum.',
//     imageUrl:
//       'https://images.unsplash.com/photo-1526743971139-a05541356e8d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
//     address: '1071 5th Ave, New York',
//     location: {
//       lat: 40.7829796,
//       lng: -73.9611593,
//     },
//     creator: 'u1',
//   },
//   {
//     id: 's2',
//     title: 'London Bridge',
//     description:
//       'A monument to modernism, the unique architecture of the space, with its spiral ramp riding to a domed skylight, continues to thrill visitors and provide a unique forum for the presentation of contemporary art.',
//     imageUrl:
//       'https://images.unsplash.com/photo-1522092372459-dff01028d904?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//     address: '1071 5th Ave, London',
//     location: {
//       lat: 40.7829796,
//       lng: -73.9611593,
//     },
//     creator: 'u1',
//   },
//   {
//     id: 's3',
//     title: 'Empire State Building',
//     description: 'One of the most famous sky scrapers in the world!',
//     imageUrl:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//     address: '20 W 34th St, New York, NY 10001',
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878584,
//     },
//     creator: 'u2',
//   },
// ];

const UserSnaps = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedSnaps, setLoadedSnaps] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    // SEND GET REQUEST
    // http://localhost:8000/api/snaps/user/:uid
    const fetchSnaps = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/snaps/user/${userId}`
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
      {!isLoading && loadedSnaps && (
        <SnapList items={loadedSnaps} onDeleteSnap={snapDeletedHandler} />
      )}
      ;
    </Fragment>
  );
};

export default UserSnaps;

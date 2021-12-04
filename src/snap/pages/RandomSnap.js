import { useState, useEffect, useCallback } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import SnapItem from '../components/SnapItem';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './RandomSnap.css';

const RandomSnap = () => {
  const { isLoading, sendRequest } = useHttpClient();

  const [loadedSnap, setLoadedSnap] = useState();

  const fetchSnap = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/snaps/random`
      );
      setLoadedSnap(responseData.snap);
    } catch (err) {}
  }, [sendRequest]);

  const randomSnapHandler = () => {
    fetchSnap();
  };

  useEffect(() => {
    // FETCH A RANDOM SNAP
    fetchSnap();
  }, [fetchSnap]);

  return (
    <div className='center-flex-column'>
      <div className='center-text random-hero center-flex-column extra-small-gap'>
        <p className='random-hero-text'>
          Here is your randomly generated snap.
        </p>
        <Button
          primary
          inverse
          type='button'
          size='medium'
          onClick={randomSnapHandler}
        >
          Try again
        </Button>
      </div>

      {isLoading && (
        <div className='center-text'>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && !loadedSnap && (
        <p className='center-text no-data-found'>
          Something went wrong. Please try again.
        </p>
      )}

      {/* {!isLoading && loadedSnap && <SnapList items={loadedSnap} />} */}
      {!isLoading && loadedSnap && (
        <ul className='random-snap'>
          {loadedSnap.map((snap) => (
            <SnapItem
              key={snap.id}
              id={snap.id}
              image={snap.image}
              title={snap.title}
              description={snap.description}
              address={snap.address}
              creatorId={snap.creator}
              coordinates={snap.location}
              onDelete=''
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default RandomSnap;

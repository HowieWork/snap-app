import { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';

import SearchBar from '../../shared/components/Hero/SearchBar';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import SnapList from '../components/SnapList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './SearchSnaps.css';

const SearchSnaps = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedSnaps, setLoadedSnaps] = useState();
  const [searchState, setSearchState] = useState();

  const history = useHistory();

  // GET KEYWORD FROM URL
  const keyword = useParams().keyword;

  // RUN EACH RENDERING
  useEffect(() => {
    // DEFINE FETCH SNAPS FUNCTION
    const fetchSnaps = async (keyword) => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/snaps/search/${keyword}`
        );
        setLoadedSnaps(responseData.snaps);
      } catch (err) {}
    };

    // CLEAR POSSIBLE PREVIOUS ERROR
    clearError();

    // FETCH SNAPS MATCHING KEYWORD
    if (keyword) fetchSnaps(keyword);
  }, [keyword, sendRequest, clearError]);

  // SUBMIT SEARCH FORM
  const searchSubmitHandler = (event) => {
    event.preventDefault();

    // REDIRECT TO LATEST SEARCH STATE
    history.push(`/search/${searchState}`);
  };

  const searchStateHandler = useCallback((keyword) => {
    setSearchState(keyword);
  }, []);

  return (
    <div className='center-flex-column'>
      <div className='center-text search-hero center-flex-column extra-small-gap'>
        <p className='search-hero-text'>
          Here is your searching result for
          {!isLoading && (
            <span className='search-hero-keyword'>{` ${
              keyword || searchState
            }`}</span>
          )}
        </p>
        <div>
          <form onSubmit={searchSubmitHandler}>
            <SearchBar
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter valid search.'
              onSearch={searchStateHandler}
            />
          </form>
        </div>
      </div>

      {isLoading && (
        <div className='center-text'>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && error && (
        <p className='center-text no-data-found'>
          Could not find any snap. Please try again.
        </p>
      )}

      {!isLoading && !error && loadedSnaps && <SnapList items={loadedSnaps} />}
    </div>
  );
};

export default SearchSnaps;

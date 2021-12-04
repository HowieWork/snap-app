import { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import Button from '../FormElements/Button';
import SearchBar from './SearchBar';

import { VALIDATOR_REQUIRE } from '../../util/validators';

import './Hero.css';

const Hero = () => {
  const [searchState, setSearchState] = useState();

  const history = useHistory();

  const searchSubmitHandler = async (event) => {
    event.preventDefault();

    // SWITCH TO SEARCH PAGE
    // history.push(`/search/${inputState.value}`);
    history.push(`/search/${searchState}`);
  };

  const searchStateHandler = useCallback((keyword) => {
    setSearchState(keyword);
  }, []);

  return (
    <section className='center-text small-gap center-flex-column section-hero'>
      <h1 className='hero-heading'>Snap</h1>
      <p className='hero-description'>
        A photo sharing platform for people who love architecture.
      </p>
      <div className='center-flex-column tiny-gap hero-cta'>
        <div className='center-flex-row tiny-gap hero-cta--actions'>
          <Button to='/random' type='button' size='medium' inverse primary>
            Random
          </Button>
          <div>
            <form onSubmit={searchSubmitHandler}>
              <SearchBar
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter valid search.'
                onSearch={searchStateHandler}
              />
            </form>
          </div>
          <p className='hero-cta--text'>
            <span>Suggested</span>: museum, plaza, palace
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

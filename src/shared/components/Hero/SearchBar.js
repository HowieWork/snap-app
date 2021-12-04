import { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';

import './SearchBar.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const SearchBar = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false,
  });

  const { onSearch } = props;
  const { value } = inputState;

  useEffect(() => {
    onSearch(value);
  }, [value, onSearch]);

  const changeHanlder = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
  };

  return (
    <div className='search-bar center-flex-row tiny-gap'>
      <label htmlFor='search' className='search-bar-label'>
        Search
      </label>
      <img
        src='/assets/search-icon.svg'
        alt='search icon'
        className='search-bar-icon'
      />
      <input
        id='search'
        type='text'
        className='search-bar-input'
        placeholder={
          (!inputState.isValid &&
            inputState.isTouched &&
            `${props.errorText}`) ||
          'Search...'
        }
        onChange={changeHanlder}
        onBlur={touchHandler}
        value={inputState.value}
      />
    </div>
  );
};

export default SearchBar;

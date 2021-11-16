import { Fragment, useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Auth.css';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // ERROR HANDLING
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // FORM STATES
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    // SIGNUP --> LOGIN
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
    // LOGIN --> SIGNUP
    if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    // LOG IN
    if (isLoginMode) {
      try {
        const response = await fetch('http://localhost:8000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();

        // IF STATUS CODE IS 400s / 500s, OK WILL BE FALSE
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);

        // CHANGE APP-WIDE ISLOGGEDIN STATE
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
      }
    }

    // SIGN UP
    if (!isLoginMode) {
      try {
        const response = await fetch('http://localhost:8000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();

        // IF STATUS CODE IS 400s / 500s, OK WILL BE FALSE
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);

        // CHANGE APP-WIDE ISLOGGEDIN STATE
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className='authentication-form'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className='authentication-form-header'>Login Required</h2>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element='input'
              id='name'
              type='text'
              label='Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name.'
              onInput={inputHandler}
            />
          )}
          <Input
            element='input'
            id='email'
            type='email'
            label='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address.'
            onInput={inputHandler}
          />
          <Input
            element='input'
            id='password'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText='Please enter a valid password, at least 5 characters.'
            onInput={inputHandler}
          />
          <div className='authentication-form-actions'>
            <Button type='submit' disabled={!formState.isValid}>
              {isLoginMode ? 'Login' : 'Signup'}
            </Button>
            {isLoginMode ? (
              <Button type='button' onClick={switchModeHandler} inverse>
                Join now
              </Button>
            ) : (
              <Button type='button' onClick={switchModeHandler} inverse>
                Switch to login
              </Button>
            )}
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default Auth;

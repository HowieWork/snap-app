import { Fragment, useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
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

  // ERROR HANDLING: useHttpClient() custom hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
        { ...formState.inputs, name: undefined, image: undefined },
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
          image: {
            value: null,
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

    console.log(formState.inputs);

    // LOG IN
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:8000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        // SET LOGGED IN & ASSIGN USER ID TO AUTH CONTEXT USERID
        auth.login(responseData.user.id);
      } catch (err) {}
    }

    // SIGN UP
    if (!isLoginMode) {
      try {
        // REQUEST BODY: FORMDATA
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        console.log(formData);

        const responseData = await sendRequest(
          'http://localhost:8000/api/users/signup',
          'POST',
          formData
          // JSON.stringify({
          //   email: formState.inputs.email.value,
          //   password: formState.inputs.password.value,
          //   name: formState.inputs.name.value,
          // }),
          // {
          //   'Content-Type': 'application/json',
          // }
        );

        // FIXME UPDATE LOGIN ARGUMENT DUE TO CHANGE OF RESPONSEDATA
        // NOTE SET LOGGED IN & ASSIGN USER ID TO AUTH CONTEXT USERID
        auth.login(responseData.user.id);
      } catch (err) {}
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
          {/* FIXME CENTER STYLE LOOKS ODD */}
          {!isLoginMode && (
            <ImageUpload
              id='image'
              center
              // FIXME HOW TO SHOW errorText? ADD TEXT
              errorText=''
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
            errorText='Please enter a valid password, at least 8 characters.'
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

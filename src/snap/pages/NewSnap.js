import { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './SnapForm.css';

const NewSnap = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
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

  // REDIRECT USER TO A DIFFERENT PAGE
  const history = useHistory();

  // Submitting form
  const snapSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(formState.inputs);

    try {
      // REQUEST BODY: FORMDATA
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', auth.userId);
      formData.append('image', formState.inputs.image.value);

      // POST REQUEST TO BACKEND
      // http://localhost:8000/api/snaps/
      await sendRequest(
        'http://localhost:8000/api/snaps/',
        'POST',
        formData
        // JSON.stringify({
        //   title: formState.inputs.title.value,
        //   description: formState.inputs.description.value,
        //   address: formState.inputs.address.value,
        //   creator: auth.userId,
        // }),
        // { 'Content-Type': 'application/json' }
      );

      // REDIRECT USER TO A DIFFERENT PAGE
      history.push('/');
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='snap-form'>
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={snapSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            placeholder='This is a placeholder for Title'
            errorText='Please enter a valid title.'
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <ImageUpload id='image' center errorText='' onInput={inputHandler} />
          <Input
            id='description'
            element='textarea'
            rows='5'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (at least 5 characters).'
            onInput={inputHandler}
          />
          <Input
            id='address'
            element='input'
            label='Address'
            placeholder='This is a placeholder for Address'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid address.'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            Add Snap
          </Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default NewSnap;

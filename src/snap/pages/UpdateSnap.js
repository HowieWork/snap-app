import { Fragment, useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './SnapForm.css';

const UpdateSnap = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSnap, setLoadedSnap] = useState();
  const snapId = useParams().snapId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    const fetchSnap = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/snaps/${snapId}`
        );
        setLoadedSnap(responseData.snap);
        setFormData(
          {
            title: {
              value: responseData.snap.title,
              isValid: true,
            },
            description: {
              value: responseData.snap.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchSnap();
  }, [sendRequest, snapId, setFormData]);

  const snapUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/snaps/${snapId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push(`/${auth.userId}/snaps`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className='center-text'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedSnap && !error)
    return (
      <div className='center-text no-data-found'>
        <p>Could not find snap!</p>
      </div>
    );

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedSnap && (
        <Card className='snap-form'>
          <form className='snap-form' onSubmit={snapUpdateSubmitHandler}>
            <Input
              id='title'
              element='input'
              type='text'
              label='Title'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid title.'
              initialValue={loadedSnap.title}
              initialIsValid={true}
              onInput={inputHandler}
            />
            <Input
              id='description'
              element='textarea'
              label='Description'
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText='Please enter a valid description (min. 5 characters).'
              initialValue={loadedSnap.description}
              initialIsValid={true}
              onInput={inputHandler}
            />
            <Button secondary type='submit' disabled={!formState.isValid}>
              Update snap
            </Button>
          </form>
        </Card>
      )}
    </Fragment>
  );
};

export default UpdateSnap;

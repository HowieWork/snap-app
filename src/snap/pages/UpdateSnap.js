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
import '../../index.css';
import './SnapForm.css';

// FIXME DELETE DUMMY DATA IN THE END
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
    // console.log(formState.inputs);
    try {
      await sendRequest(
        `http://localhost:8000/api/snaps/${snapId}`,
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
            <Button type='submit' disabled={!formState.isValid}>
              Update snap
            </Button>
          </form>
        </Card>
      )}
    </Fragment>
  );
};

export default UpdateSnap;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import '../../index.css';
import './SnapForm.css';

const DUMMY_SNAPS = [
  {
    id: 's1',
    title: 'Guggenheim',
    description:
      'The unique architecture of the space, with its spiral ramp riding to a domed skylight, continues to thrill visitors and provide a unique forum.',
    imageUrl:
      'https://images.unsplash.com/photo-1526743971139-a05541356e8d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    address: '1071 5th Ave, New York',
    location: {
      lat: 40.7829796,
      lng: -73.9611593,
    },
    creator: 'u1',
  },
  {
    id: 's2',
    title: 'London Bridge',
    description:
      'A monument to modernism, the unique architecture of the space, with its spiral ramp riding to a domed skylight, continues to thrill visitors and provide a unique forum for the presentation of contemporary art.',
    imageUrl:
      'https://images.unsplash.com/photo-1522092372459-dff01028d904?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    address: '1071 5th Ave, London',
    location: {
      lat: 40.7829796,
      lng: -73.9611593,
    },
    creator: 'u1',
  },
  {
    id: 's3',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u2',
  },
];

const UpdateSnap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const snapId = useParams().snapId;

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

  const identifiedSnap = DUMMY_SNAPS.find((snap) => snap.id === snapId);

  useEffect(() => {
    if (identifiedSnap) {
      setFormData(
        {
          title: {
            value: identifiedSnap.title,
            isValid: true,
          },
          description: {
            value: identifiedSnap.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedSnap]);

  const snapUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  // BUG Error message won't be executed if no found
  if (!identifiedSnap)
    return (
      <div className='center-text'>
        {/* FIXME style error message */}
        <p className='no-snaps-found'>Could not find snap!</p>
      </div>
    );

  if (isLoading) {
    return (
      <div className='center-text'>
        {/* FIXME style error message */}
        <p className='no-snaps-found'>Loading...</p>
      </div>
    );
  }
  return (
    <form className='snap-form' onSubmit={snapUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
        onInput={inputHandler}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (min. 5 characters).'
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>
        Update snap
      </Button>
    </form>
  );
};

export default UpdateSnap;

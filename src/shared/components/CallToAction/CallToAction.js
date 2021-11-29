import { useContext } from 'react';

import Button from '../FormElements/Button';
import { AuthContext } from '../../context/auth-context';

import './CallToAction.css';

const CallToAction = () => {
  const auth = useContext(AuthContext);

  if (auth.isLoggedIn) {
    return null;
  }

  return (
    <div className='CTA-section center-flex-column extra-small-gap'>
      <p className='CTA-section--text'>Join us. Start your journey here.</p>
      {/* TODO IMPLEMENT UPLOAD A SNAP FEATURE */}
      <Button type='button' primary inverse size='medium'>
        Upload a snap
      </Button>
    </div>
  );
};

export default CallToAction;

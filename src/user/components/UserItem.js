import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';

import './UserItem.css';

const UserItem = (props) => {
  return (
    <Card className='user-item'>
      <li>
        <div className='user-item__image'>
          <Avatar image={props.image} alt={props.name} />
        </div>
        <div className='user-item__info'>
          <p className='user-item__info-name'>{props.name}</p>
          <p className='user-item__info-text'>{props.motto}</p>
          <Button to={`/${props.id}/snaps`}>
            {props.snapCount} {props.snapCount === 1 ? 'Snap' : 'Snaps'}
          </Button>
        </div>
      </li>
    </Card>
  );
};

export default UserItem;

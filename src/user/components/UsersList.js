import UserItem from './UserItem';

import '../../index.css';
import './UsersList.css';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center-text'>
        <p className='users-list-no-users-found'>No Users Found</p>
      </div>
    );
  }
  return (
    <ul className='users-list'>
      {props.items.map((item) => (
        <UserItem
          key={item.id}
          id={item.id}
          name={item.name}
          motto={item.motto}
          image={item.image}
          snapCount={item.snapCount}
        />
      ))}
    </ul>
  );
};

export default UsersList;

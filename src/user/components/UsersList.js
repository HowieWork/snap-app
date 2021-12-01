import UserItem from './UserItem';

import './UsersList.css';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center-text no-data-found'>
        <p>No Users Found.</p>
      </div>
    );
  }
  return (
    <div className='users-section center-text' id='users'>
      <h2>HIGHLIGHTS</h2>
      <ul className='users-list'>
        {props.items.map((item) => (
          <UserItem
            key={item.id}
            id={item.id}
            name={item.name}
            motto={item.motto}
            image={item.image}
            snapCount={item.snaps.length}
          />
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

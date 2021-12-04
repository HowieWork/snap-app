import SnapItem from './SnapItem';
import Button from '../../shared/components/FormElements/Button';

import '../../index.css';
import './SnapList.css';

const SnapList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center-flex-column medium-gap no-data-found'>
        <p>No snaps found. Maybe create one?</p>
        <Button to='/snaps/new' secondary>
          Create Snap
        </Button>
      </div>
    );
  }
  return (
    <ul className='snaps-list'>
      {props.items.map((snap) => (
        <SnapItem
          key={snap.id}
          id={snap.id}
          image={snap.image}
          title={snap.title}
          description={snap.description}
          address={snap.address}
          creatorId={snap.creator}
          coordinates={snap.location}
          onDelete={props.onDeleteSnap}
        />
      ))}
    </ul>
  );
};

export default SnapList;

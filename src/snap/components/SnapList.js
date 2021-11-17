import SnapItem from './SnapItem';
import Button from '../../shared/components/FormElements/Button';

import '../../index.css';
import './SnapList.css';

const SnapList = (props) => {
  console.log(props);
  if (props.items.length === 0) {
    return (
      <div className='center-flex-column medium-gap no-data-found'>
        <p>No snaps found. Maybe create one?</p>
        <Button to='/snaps/new'>Create Snap</Button>
      </div>
    );
  }
  return (
    <ul className='snaps-list'>
      {props.items.map((snap) => (
        <SnapItem
          key={snap.id}
          id={snap.id}
          image={snap.imageUrl}
          title={snap.title}
          description={snap.description}
          address={snap.address}
          creatorId={snap.creator}
          coordinates={snap.location}
        />
      ))}
    </ul>
  );
};

export default SnapList;

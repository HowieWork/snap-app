import SnapItem from './SnapItem';

import '../../index.css';
import './SnapList.css';

const SnapList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center-text'>
        <p className='snaps-list-no-snaps-found'>
          No snaps found. Maybe create one?
        </p>
        <button>Share Snap</button>
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

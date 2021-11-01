import { Fragment, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

import './SnapItem.css';

const SnapItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={`ICON ${props.address}`}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className='map-container'>
          <h2>THE MAP</h2>
        </div>
      </Modal>
      <Card className='snap-item'>
        <li>
          <div className='snap-item__image'>
            <img src={props.image} alt={props.title} />
          </div>
          <div className='snap-item__info'>
            <p className='snap-item__info-title'>{props.title}</p>
            <p className='snap-item__info-address'>{props.address}</p>
            <p className='snap-item__info-description'>{props.description}</p>
          </div>
          <div className='snap-item__actions'>
            <Button onClick={openMapHandler}>View on map</Button>
            <Button to={`/snaps/${props.id}`} inverse>
              Edit
            </Button>
            <Button danger>Delete</Button>
            {/*FIXME <Button disabled>Button</Button>
          <Button size='small'>Small Button</Button>
          <Button size='large' inverse='true'>
            Large Revs Btn
          </Button>
          <Button href='#' danger='true'>
            Danger Anchor Btn
          </Button>
          <Button to='#'>Link Button</Button>

          <button>View on map</button>
          <button>Edit</button>
          <button>Delete</button> */}
          </div>
        </li>
      </Card>
    </Fragment>
  );
};

export default SnapItem;

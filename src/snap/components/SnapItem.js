import { Fragment, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

import './SnapItem.css';

const SnapItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
  };

  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={`ICON ${props.address}`}
        contentClass='snap-item__modal-content'
        footerClass='snap-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={12} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        contentClass='snap-item__modal-content'
        footerClass='snap-item__modal-actions'
        footer={
          <Fragment>
            <Button onClick={cancelDeleteHandler} inverse>
              Cancel
            </Button>
            <Button onClick={confirmDeleteHandler} danger>
              Delete
            </Button>
          </Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this snap? You can't undo this
          action.
        </p>
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
            <Button onClick={openMapHandler}>View on Map</Button>
            <Button to={`/snaps/${props.id}`} inverse>
              Edit
            </Button>
            <Button onClick={showDeleteWarningHandler} danger>
              Delete
            </Button>
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

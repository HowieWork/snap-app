import { Fragment, useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';

import './SnapItem.css';

const SnapItem = (props) => {
  const auth = useContext(AuthContext);
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
        header={props.address}
        contentClass='snap-item__modal-content'
        footerClass='snap-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={14} />
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
          <div className='center-flex-column small-gap'>
            <div className='center-flex-column extra-small-gap snap-item__info'>
              <p className='snap-item__info-title'>{props.title}</p>
              <p className='snap-item__info-address'>{props.address}</p>
              <p className='snap-item__info-description'>{props.description}</p>
            </div>
            <div className='center-flex-row tiny-gap snap-item__actions'>
              <Button onClick={openMapHandler}>View on Map</Button>
              {auth.isLoggedIn && (
                <Button to={`/snaps/${props.id}`} inverse>
                  Edit
                </Button>
              )}
              {auth.isLoggedIn && (
                <Button onClick={showDeleteWarningHandler} danger>
                  Delete
                </Button>
              )}
            </div>
          </div>
        </li>
      </Card>
    </Fragment>
  );
};

export default SnapItem;

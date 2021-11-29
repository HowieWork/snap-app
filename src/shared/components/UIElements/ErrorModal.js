import Modal from './Modal';
import Button from '../FormElements/Button';

import './ErrorModal.css';

const ErrorModal = (props) => {
  return (
    <Modal
      className='center-text'
      onCancel={props.onClear}
      header='An Error Occurred!'
      show={!!props.error}
      footer={
        <Button onClick={props.onClear} secondary>
          Okay
        </Button>
      }
    >
      {/* TODO IS THIS ERROR-MODAL-TEXT GOOD WAY? */}
      <p className='error-modal-text'>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;

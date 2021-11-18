import { useRef, useState, useEffect } from 'react';
import Button from './Button';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    // DOM ELEMENT CLICK
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    // EVENT.TARGET.FILES CONTAINS UPLOADED FILE INFO
    // console.log(event.target.files);

    let pickedFile;

    // USE FILEISVALID VARIABLE IN CASE SETISVALID HAPPENS AFTER EXECUATION OF PROPS.ONINPUT
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    // LOAD EVENT TRIGGERED EACH TIME THE READING IS COMPLETED
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className='form-control'>
      {/* NOT SHOW INPUT UNLESS CLICK BUTTON */}
      <input
        id={props.id}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={`${props.center && 'center-flex-column'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='preview' />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          Pick image
        </Button>
        {/* FIXME HAVEN'T SHOW ERROR TEXT YET */}
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;

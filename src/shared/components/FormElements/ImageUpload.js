import { useRef, useState, useEffect } from 'react';
import Button from './Button';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    let pickedFile;

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
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className='form-control'>
      <input
        id={props.id}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg,.webp'
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={`${props.center && 'center-flex-column'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='preview' />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type='button' secondary onClick={pickImageHandler}>
          Pick image
        </Button>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;

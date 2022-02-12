import {
  MdIosShare,
  MdOutlineMap,
  MdOutlineHolidayVillage,
  MdOutlineLuggage,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import './Features.css';

const Features = () => {
  return (
    <section className='center-text large-gap center-flex-row section-features'>
      <div className='feature center-flex-column tiny-gap'>
        <div className='feature-icon'>
          <MdIosShare title='share icon' />
        </div>
        <p className='feature-title'>Share</p>
        <p className='feature-text'>
          Upload favorite snaps and share with others.
        </p>
      </div>
      <div className='feature center-flex-column tiny-gap'>
        <div className='feature-icon'>
          <MdOutlineMap />
        </div>
        <p className='feature-title'>Navigate</p>
        <p className='feature-text'>
          Pick one snap interests you. See where it is.
        </p>
      </div>
      <div className='feature center-flex-column tiny-gap'>
        <div className='feature-icon'>
          <MdOutlineHolidayVillage />
        </div>
        <p className='feature-title'>Architecture</p>
        <p className='feature-text'>
          Delve into unique architecture. Be inspired.
        </p>
      </div>
      <div className='feature center-flex-column tiny-gap'>
        <div className='feature-icon'>
          <MdOutlineLuggage />
        </div>
        <p className='feature-title'>Plan</p>
        <p className='feature-text'>Explore selected tours. Plan a visit.</p>
      </div>
      <div className='scroll-down'>
        <MdKeyboardArrowDown />
      </div>
    </section>
  );
};

export default Features;

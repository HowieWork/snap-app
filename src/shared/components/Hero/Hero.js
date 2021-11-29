import Button from '../FormElements/Button';
import './Hero.css';

const Hero = () => {
  // TODO ADD RANDOM SNAP GENERATION FEATURE
  const randomClickHandler = () => {
    console.log('THIS WILL GENERATE A RANDOM SNAP.');
  };

  return (
    <section className='center-text small-gap center-flex-column section-hero'>
      <h1 className='hero-heading'>Snap</h1>
      <p className='hero-description'>
        A photo sharing platform for people who love architecture.
      </p>
      <div className='center-flex-column tiny-gap hero-cta'>
        <div className='center-flex-row tiny-gap hero-cta--actions'>
          {/* FIXME UPDATE BUTTON FOR RANDOM */}
          <Button
            type='button'
            size='medium'
            inverse
            primary
            onClick={randomClickHandler}
          >
            Random
          </Button>
          {/* FIXME UPDATE BUTTON FOR SEARCH ACTION */}
          <Button type='button' size='medium' inverse primary whiteBg>
            A VERY LONG SEARCH PLAVEHOLDER
          </Button>
          <p className='hero-cta--text'>
            <span>Suggested</span>: museum, plaza, church
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.css';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { Footer } from '../../components/Footer/Footer';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const Buttons = () => {
    return <Button icon='' onClick={() => navigate('discover')} text='Discover' type='filled' />;
  };

  return (
    <>
      <main>
        <div className={`hero ${styles['not-found']}`}>
          <div className='hero-column'>
            <Content
              buttons={<Buttons />}
              heading='Page not found'
              subHeading={`The page you're searching for might be playing in another theater`}
            />
          </div>
          <div className='hero-column' />
        </div>
      </main>
      <Footer />
    </>
  );
};

import { useNavigate } from 'react-router-dom';

import styles from './Home.module.css';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';

export const HomePage = () => {
  const navigate = useNavigate();

  const Buttons = () => {
    return <Button icon='' onClick={() => navigate('discover')} text='Discover' type='filled' />;
  };

  return (
    <main>
      <div className={`hero ${styles.home}`}>
        <div className='hero-column'>
          <Content
            buttons={<Buttons />}
            heading='What to watch next?'
            subHeading={`Life is like a box of chocolates, you never know what you're going to get`}
          />
        </div>
        <div className='hero-column' />
      </div>
    </main>
  );
};

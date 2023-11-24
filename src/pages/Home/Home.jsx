import styles from './Home.module.css';
import { Content } from '../../components/Content/Content';

export const HomePage = () => {
  return (
    <main className='main'>
      <div className={`container hero ${styles.home}`}>
        <div className='hero-column'>
          <Content
            button='Discover'
            heading='What to watch next?'
            navigate='/discover'
            subHeading='Find the best option with us and share your opinion'
          />
        </div>
        <div className='hero-column' />
      </div>
    </main>
  );
};

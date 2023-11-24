import styles from './NotFound.module.css';
import { Content } from '../../components/Content/Content';

export const NotFoundPage = () => {
  return (
    <main className='main'>
      <div className={`container hero ${styles['not-found']}`}>
        <div className='hero-column'>
          <Content
            button='Home'
            heading='Page not found'
            navigate='/'
            subHeading='Life is like a box of chocolates, but this page seems to be missing from the box'
          />
        </div>
        <div className='hero-column' />
      </div>
    </main>
  );
};

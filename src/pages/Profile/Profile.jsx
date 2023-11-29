import { useEffect, useState } from 'react';

import styles from './Profile.module.css';
import { getWatchlist } from '../../services/watchlist.service';

export const ProfilePage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { watchlist } = await getWatchlist();

        setWatchlist(watchlist);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={styles.watchlist}>
      {watchlist.map((movie) => (
        <p>{movie}</p>
      ))}
    </div>
  );
};

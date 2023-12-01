import { useEffect, useRef, useState } from 'react';

import styles from './Slider.module.css';

export const Slider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [startX, setStartX] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setScrollLeft(slider.scrollLeft);
      setStartX(e.pageX - slider.offsetLeft);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;
        const distance = x - startX;

        slider.scrollLeft = scrollLeft - distance;
      }
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseup', handleMouseUp);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, scrollLeft, startX]);

  return (
    <div className={styles['slider-container']}>
      <div className={styles.slider} ref={sliderRef}>
        <div className={styles.slide}>1</div>
        <div className={styles.slide}>2</div>
        <div className={styles.slide}>3</div>
        <div className={styles.slide}>4</div>
        <div className={styles.slide}>5</div>
      </div>
    </div>
  );
};

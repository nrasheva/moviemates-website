import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Modal.module.css';
import { Button } from '../../components/Button/Button';
import { setModal } from '../../redux/reducers/shared';

export const Modal = () => {
  const { text, visible } = useSelector((state) => state.shared.modal);

  const dispatch = useDispatch();

  const modalRef = useRef(null);

  useEffect(() => {
    if (visible) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [visible]);

  return (
    <dialog className={styles.dialog} ref={modalRef}>
      <h3>Warning</h3>
      <p className='font-m'>{text}</p>
      <Button
        icon=''
        onClick={() =>
          dispatch(
            setModal({
              text: '',
              visible: false,
            }),
          )
        }
        text='Accept'
        type='outlined'
      />
    </dialog>
  );
};

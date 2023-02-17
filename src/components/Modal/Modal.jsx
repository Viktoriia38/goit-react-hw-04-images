import propTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export function Modal(props) {
  const onBackDropPress = e => {
    if (e.target === e.currentTarget) {
      props.closeModal();
    }
  };

  const onEscPress = e => {
    if (e.code === 'Escape') {
      props.closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscPress);
    window.addEventListener('click', onBackDropPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
      window.removeEventListener('click', onBackDropPress);
    };
  });

  const { id, largeImageURL, tags } = props.images;

  return createPortal(
    <div onClick={onBackDropPress} className={css.overlay}>
      <div className={css.modal} key={id}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    document.getElementById('modal')
  );
}

Modal.propTypes = {
  closeModal: propTypes.func.isRequired,
  images: propTypes.shape({
    tags: propTypes.string.isRequired,
    largeImageURL: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
  }),
};

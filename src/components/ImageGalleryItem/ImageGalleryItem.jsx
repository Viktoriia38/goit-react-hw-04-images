import propTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem(props) {
  const [isOpenModal, setIsOpemModal] = useState(false);

  const handleToggleModal = () => {
    setIsOpemModal(prevState => !prevState);
  };

  const { webformatURL, tags, id } = props.images;
  return (
    <li className={css.galleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        id={id}
        className={css.galleryImage}
        onClick={handleToggleModal}
      />
      {isOpenModal && (
        <Modal images={props.images} closeModal={handleToggleModal} />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  images: propTypes.shape({
    tags: propTypes.string.isRequired,
    webformatURL: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
  }),
};

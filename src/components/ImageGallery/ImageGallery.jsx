import propTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery(props) {
  const { images } = props;

  return (
    <>
      <ul className={css.gallery}>
        {images.map(hit => (
          <ImageGalleryItem images={hit} key={hit.id} />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: propTypes.array.isRequired,
};

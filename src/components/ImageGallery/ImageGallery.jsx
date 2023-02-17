import propTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Component } from 'react';

export class ImageGallery extends Component {
  render() {
    const { images } = this.props;

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
}

ImageGallery.propTypes = {
  images: propTypes.array.isRequired,
};

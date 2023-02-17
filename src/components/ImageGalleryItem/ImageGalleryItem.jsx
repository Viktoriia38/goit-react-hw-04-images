import propTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };

  handleToggleModal = () => {
    this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));
  };

  render() {
    const { webformatURL, tags, id } = this.props.images;
    return (
      <li className={css.galleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          id={id}
          className={css.galleryImage}
          onClick={this.handleToggleModal}
        />
        {this.state.isOpenModal && (
          <Modal
            images={this.props.images}
            closeModal={this.handleToggleModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: propTypes.shape({
    tags: propTypes.string.isRequired,
    webformatURL: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
  }),
};

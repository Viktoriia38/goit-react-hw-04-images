import propTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export class Modal extends Component {
  onBackDropPress = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  onBackDropPress = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  onEscPress = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscPress);
    window.addEventListener('click', this.onBackDropPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
    window.removeEventListener('click', this.onBackDropPress);
  }

  render() {
    const { id, largeImageURL, tags } = this.props.images;

    return createPortal(
      <div onClick={this.onBackDropPress} className={css.overlay}>
        <div className={css.modal} key={id}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      document.getElementById('modal')
    );
  }
}

Modal.propTypes = {
  closeModal: propTypes.func.isRequired,
  images: propTypes.exact({
    tags: propTypes.string.isRequired,
    largeImageURL: propTypes.string.isRequired,
    id: propTypes.object.isRequired,
  }),
};

import { useState } from 'react';
import propTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './Searchbar.module.css';

export function Searchbar(props) {
  const [name, setName] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name === '') {
      Notify.info('Write text for search');
    }
    props.onSubmit(name.trim().toLowerCase());
    reset();
  };

  const reset = () => {
    setName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={css.input}
          type="text"
          autoComplete="off"
          name="name"
          value={name || ''}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  state: propTypes.shape({
    name: propTypes.string.isRequired,
  }),
};

import css from './Button.module.css';

export function Button({ onClick }) {
  return (
    <button onClick={onClick} className={css.Button}>
      Load more
    </button>
  );
}

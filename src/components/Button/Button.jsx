import css from './Button.module.css';

export function Button({ onClick }) {
  //   console.log(onClick);
  return (
    <button onClick={onClick} className={css.Button}>
      Load more
    </button>
  );
}

import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export function Loader() {
  return (
    <div className={css.loader}>
      <InfinitySpin width="200" color="#4fa94d" className={css.loader} />
    </div>
  );
}

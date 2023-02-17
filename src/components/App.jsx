import './styles.css';
import css from './App.module.css';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImagesService } from 'services/image-gallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export function App() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [perPage, setPerPage] = useState(12);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const formSubmit = name => {
    if (name !== query) {
      setImages([]);
      setQuery(name);
      setPage(1);
      setPerPage(12);
    }
  };

  const handleAddImages = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (!query) return;
    async function takeImages() {
      setStatus('loading');
      try {
        const response = await getImagesService(query, perPage, page);
        setImages(prevState => [...prevState, ...response.hits]);
        setTotalHits(response.totalHits);
        setStatus('fulfilled');
      } catch (error) {
        setStatus('rejected');
        throw new Error(error.message);
      }
    }
    takeImages();
  }, [query, page, perPage]);

  const coin = Math.ceil(totalHits / perPage);

  return (
    <div className={css.App}>
      {status === 'loading' && <Loader />}
      <Searchbar onSubmit={formSubmit} query={query} />
      <ImageGallery images={images} />
      {coin > 1 && coin !== page && <Button onClick={handleAddImages} />}
    </div>
  );
}

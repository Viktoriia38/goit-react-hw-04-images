import './styles.css';
import css from './App.module.css';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImagesService } from 'services/image-gallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    status: 'idle',
    perPage: 12,
    query: '',
    page: 1,
    isLoading: false,
    totalHits: 0,
  };

  formSubmit = name => {
    const { query } = this.state;

    if (name !== query) {
      this.setState({
        images: [],
        query: name,
        page: 1,
        perPage: 12,
        isLoading: false,
      });
    }
  };

  handleAddImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const { query, perPage, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ status: 'loading' });
      this.setState({ isLoading: true });
      try {
        const response = await getImagesService({
          query,
          perPage,
          page,
        });
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          totalHits: response.totalHits,
          status: 'fulfilled',
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
        throw new Error(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { totalHits, images, page, query } = this.state;
    const coin = Math.floor(totalHits / this.state.perPage);

    return (
      <div className={css.App}>
        {this.state.isLoading && <Loader />}
        <Searchbar onSubmit={this.formSubmit} query={query} />
        <ImageGallery images={images} />
        {coin > 1 && coin !== page && <Button onClick={this.handleAddImages} />}
      </div>
    );
  }
}

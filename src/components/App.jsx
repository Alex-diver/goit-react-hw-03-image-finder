// import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Component } from 'react';

import { AppStyled, Error, ErrorText } from './App.styled';
import { AllImages } from '../api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImagesGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Mobal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

// import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    searchName: '',
    gallery: [],
    largeImageURL: '',
    isLoading: false,
    showModal: false,
    page: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { searchName, page } = this.state;

    if (searchName.trim() === '') {
      this.setState({ gallery: [] });
      return Notify.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    try {
      this.toggleLoading();
      const response = await AllImages(searchName, page);
      const gallery = response.data.hits;

      if (gallery.length === 0 && page === 1) {
        this.setState({ gallery: [] });
        return Notify.info(`No images found for ${searchName}`);
      } else {
        this.setState(prevState => ({
          gallery: page === 1 ? gallery : [...prevState.gallery, ...gallery],
          error: null,
        }));
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.toggleLoading();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchName } = this.state;
    const imgName = event.target[0].value.toLowerCase();

    if (searchName === imgName) {
      return Notify.info(
        `Sorry, there are no images ${searchName} images.Please try again.`
      );
    }
    this.setState({
      searchName: imgName,
      page: 1,
    });
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleLoading = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
    }));
  };

  render() {
    // const { images, isLoading, error, isLastPage } = this.state;
    const { isLoading, gallery, largeImageURL, showModal, error } = this.state;
    const showLoadMoreButton = gallery.length > 0;

    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {isLoading && <Loader toggleLoading={this.toggleLoading} />}
        {error && (
          <Error>
            <ErrorText>"{error}"</ErrorText>
          </Error>
        )}
        <ImagesGallery gallery={gallery} toggleModal={this.toggleModal} />
        {showModal && (
          <Modal largeImageURL={largeImageURL} toggleModal={this.toggleModal} />
        )}
        {isLoading && <Loader />}
        {showLoadMoreButton && <Button onClick={this.loadMore} />}

        {/* <Credits />
        <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" /> */}
      </AppStyled>
    );
  }
}

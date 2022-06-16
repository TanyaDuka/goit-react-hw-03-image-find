import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';

import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import { Watch } from 'react-loader-spinner';
import s from '../App/App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchAPI from 'service/FetchApiPhoto/fetchAPI';

Notify.init({
  width: '300px',
  position: 'right-bottom',
  closeButton: false,
  clickToClose: true,
  timeout: 2000,
});

const PER_PAGE = 12;

export class App extends Component {
  state = {
    images: null,
    page: 1,
    search: '',
    error: null,
    status: 'idle',
    showModal: false,
    modalImageId: null,
    showLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search) {
      this.setState({ status: 'pending', page: 1 });
      return fetchAPI(search, page, PER_PAGE)
        .then(images => {
          if (images.hits.length === 0) {
            Notify.failure('Oops, not found, try again😢');
            return this.setState({ status: 'rejected' });
          }
          this.setState({
            images: images.hits,
            status: 'resolved',
            showLoadMore: true,
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== page) {
      return fetchAPI(search, page, PER_PAGE).then(arr => {
        const check = arr.totalHits > page * PER_PAGE;
        if (!check) {
          this.setState({ showLoadMore: false });
        }
        this.setState(({ images }) => ({
          images: [...images, ...arr.hits],
        }));
      });
    }
  }
  
  toggleModal() {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  }

  
  onSubmitSearchBar = name => {
    this.setState({ search: name });
  };

  modalSetId = id => {
    const { images } = this.state;

    if (images) {
      return images.find(image => image.id === id);
    }
  };
  
  gallerySetId = id => {
    this.setState({ modalImageId: id });
    this.toggleModal();
  };

  
  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { status, showModal, modalImageId, images, showLoadMore } =
      this.state;
    return (
      <div className={s.App}>
        <Searchbar
          onSubmit={this.onSubmitSearchBar}
          onChange={this.handleSearch}
        />
        {status === 'pending' && (
          <span className={s.Loader}>
            <Watch ariaLabel="loading-indicator" />
          </span>
        )}
        {status === 'pending' ||
          (showModal && (
            <Modal onClose={() => this.toggleModal()}>
              <img
                src={this.modalSetId(modalImageId).largeImageURL}
                alt={this.modalSetId(modalImageId).tags}
              />
            </Modal>
          ))}
        {status === 'resolved' && (
          <ImageGallery imagesObj={images} onGalleryId={this.gallerySetId} />
        )}
        <div className={s.ButtonDiv}>
          {status === 'resolved' && showLoadMore && (
            <Button nextPage={this.nextPage} />
          )}
        </div>
      </div>
    );
  }
}

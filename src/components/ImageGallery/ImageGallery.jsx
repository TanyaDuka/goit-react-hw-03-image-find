import ImageGalleryItem from 'components/ImageGalleryItem';
import { Component } from 'react';
import s from '../ImageGallery/ImageGallery.module.css';
import { Events, animateScroll as scroll } from 'react-scroll';
import propTypes from 'prop-types';

export default class ImageGallery extends Component {
  componentDidMount() {
    Events.scrollEvent.register('begin', function () {});

    Events.scrollEvent.register('end', function () {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imagesObj.length !== this.props.imagesObj.length) {
      scroll.scrollToBottom();
    }
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
  onClickImage = id => {
    this.props.onGalleryId(id);
  };
  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.props.imagesObj.map(
          ({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webURL={webformatURL}
              tags={tags}
              onClickItemImage={() => this.onClickImage(id)}
            />
          )
        )}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  onClickImage: propTypes.func,
  imagesObj: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags:propTypes.string.isRequired
    })
  ).isRequired,
};

import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import propTypes from 'prop-types';
const ImageGalleryItem = ({ webURL, tags, onClickItemImage, id }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={() => onClickItemImage(id)}>
      <img className={s.ImageGalleryItemImage} src={webURL} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;


ImageGalleryItem.propTypes = {
  onClickItemImage: propTypes.func.isRequired,
  tags: propTypes.string.isRequired,
  webURL:propTypes.string.isRequired,
  id: propTypes.number.isRequired,
};

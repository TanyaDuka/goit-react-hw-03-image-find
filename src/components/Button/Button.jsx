import s from '../Button/Button.module.css';
import propTypes from 'prop-types';
export const Button = ({ nextPage }) => {
  return (
    <button type="button" className={s.Button} onClick={nextPage}>
      Load more
    </button>
  );
};

Button.propTypes = {
  nextPage:propTypes.func.isRequired
}
export default Button;

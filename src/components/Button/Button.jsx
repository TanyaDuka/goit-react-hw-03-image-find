import s from '../Button/Button.module.css';
export const Button = ({ nextPage }) => {
  return (
    <button type="button" className={s.Button} onClick={nextPage}>
      Load more
    </button>
  );
};
export default Button;

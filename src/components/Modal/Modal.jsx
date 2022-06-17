import { Component } from 'react';
import s from '../Modal/Modal.module.css';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleCloseClick}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}


Modal.propTypes = {
  children: propTypes.element,
  onClose:propTypes.func.isRequired
}
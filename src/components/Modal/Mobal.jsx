import { Component } from 'react';

import { ModalStyled, Overlay, Img } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.toggleModal();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <Img src={largeImageURL} width="800" height="500" />
        </ModalStyled>
      </Overlay>
    );
  }
}

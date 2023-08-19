// import { Component } from 'react';
import { ImageItem, ImageGalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, alt, onClick }) => {
  return (
    <ImageItem>
      <ImageGalleryItemImg
        src={webformatURL}
        alt={alt}
        width="340"
        height="230"
        onClick={onClick}
      />
    </ImageItem>
  );
};

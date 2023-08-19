import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImagesGallery = ({ gallery, toggleModal }) => {
  const onClick = largeImageURL => {
    toggleModal(largeImageURL);
  };
  return (
    <ImageGalleryList>
      {gallery &&
        gallery.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            alt={tags}
            onClick={() => onClick(largeImageURL)}
          />
        ))}
    </ImageGalleryList>
  );
};

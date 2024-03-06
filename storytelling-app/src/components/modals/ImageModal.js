// ImageModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const ImageModal = ({ isOpen, imageUrl, onRequestClose }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg'; // Set a default filename for the downloaded image
    link.click();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Enlarged Image"
    >
      <img src={imageUrl} alt="Enlarged Image" />
      <button onClick={downloadImage}>Download</button>
    </Modal>
  );
};

export default ImageModal;

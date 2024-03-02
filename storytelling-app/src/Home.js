// Home.js
import React, { useState } from 'react';
import ImageForm from './components/ImageForm';
import ImageModal from './components/ImageModal'; // Import the ImageModal component
import './css/Home.css'; // Import CSS file for styling

const Home = () => {
    const [images, setImages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImagesReceived = (extractedImages) => {
    setImages(extractedImages);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <div className="left-section">
        <ImageForm onImagesReceived={handleImagesReceived} />
      </div>
      <div className="right-section">
        <div className="image-grid">
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Image ${index + 1}`}
              onClick={() => openModal(imageUrl)} // Open modal when image is clicked
            />
          ))}
        </div>
      </div>
      <ImageModal
        isOpen={modalIsOpen}
        imageUrl={selectedImage}
        onRequestClose={closeModal}
      />
    </div>
  );
};
export default Home;

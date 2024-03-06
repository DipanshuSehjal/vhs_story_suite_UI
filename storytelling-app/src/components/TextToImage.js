// TextToImage.js

import React, { useState } from 'react';
import TextToImageForm from '../components/forms/TextToImageForm';
import ImageModal from '../components/modals/ImageModal'; // Import your existing ImageModal component
import '../css/TextToImage.css'; // Import CSS file for styling

const TextToImage = () => {
  const [images, setImages] = useState([]);
  // NEW:
  const [selectedImage, setSelectedImage] = useState(null);


  // Function to handle received images
  const handleImagesReceived = (extractedImages) => {
    setImages(extractedImages);
  };

  // NEW: Function to handle image click and enlarge
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="home-container">
      {/* Left section with ImageForm */}
      <div className="left-section">
        <TextToImageForm onImagesReceived={handleImagesReceived} />
      </div>

      {/* Right section for displaying images */}
      <div className="right-section">
        {/* Display images in a grid layout */}
        <div className="image-grid">

          {images.map((imageUrl, index) => (
            <div key={index} className="image-container">
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(imageUrl)} // Handle image click
              />
            </div>

          ))}
        </div>
      </div>

      {/* Modal to display enlarged image */}
      <ImageModal
        isOpen={!!selectedImage} // Pass true if selectedImage is not null
        imageUrl={selectedImage}
        onRequestClose={() => setSelectedImage(null)} // Close modal when requested
      />
    </div>
  );
};

export default TextToImage;

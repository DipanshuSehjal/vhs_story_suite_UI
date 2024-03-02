// Home.js
import React, { useState } from 'react';
import ImageForm from './components/ImageForm';
import './css/Home.css'; // Import CSS file for styling

const Home = () => {
    const [images, setImages] = useState([]);

    const handleImagesReceived = (extractedImages) => {
    setImages(extractedImages);
  };

  return (
    <div className="container">
      <div className="left-section">
            <ImageForm onImagesReceived={handleImagesReceived} />
      </div>
      <div className="right-section">
        <div className="image-grid">
          {images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;

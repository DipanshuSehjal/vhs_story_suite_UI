// Home.js
import React from 'react';
import ImageForm from './components/ImageForm';
import './css/Home.css'; // Import CSS file for styling

const Home = () => {
  return (
    <div className="container">
      <div className="left-section">
        <ImageForm />
      </div>
      <div className="right-section">
        <div className="image-grid">
          {Array.from({ length: 6 }, (_, index) => (
            <img
              key={index}
              src={`https://via.placeholder.com/150?text=Image${index + 1}`}
              alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

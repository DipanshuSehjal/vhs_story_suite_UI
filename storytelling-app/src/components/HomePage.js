// HomePage.js

import React, { useState, useEffect } from 'react';
import JSZip from 'jszip'; // Import JSZip library
import '../css/HomePage.css'; // Import the CSS from the src/css directory
import fetchImages from '../utils/fetchImages'; // Import the fetchImages function
import SlideShow from './SlideShow';


const HomePage = () => {
  const [inputValue, setInputValue] = useState(''); // State to hold the input value
  const [images, setImages] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false); // Flag to track if submit button is clicked

  const handleSubmit = async () => {
    try {
      console.log(inputValue);
      const zipBlob = await fetchImages(inputValue);
      const zip = new JSZip(); // Create a new instance of JSZip
      const zipData = await zip.loadAsync(zipBlob); // Load the ZIP file
      console.log('ZIP file loaded:', zipData);

      // Now you can iterate over the contents of the ZIP file and process them as needed
      // For example, you can use forEach to iterate over the files in the ZIP file
      const imgPromises = [];
      zipData.forEach((relativePath, zipEntry) => {
        imgPromises.push(zipEntry.async('base64')); // Convert images to base64
      });

      Promise.all(imgPromises).then(imageData => {
        // Convert base64 image data to URLs
        const imageUrls = imageData.map(base64 => `data:image/png;base64,${base64}`);
        setImages(imageUrls);
      });
    } catch (error) {
      console.error('Failed to fetch images:', error.message);
    }
  };

  useEffect(() => {
    // Load images only when submit button is clicked
    if (submitClicked && inputValue) {
      handleSubmit();
      setSubmitClicked(false); // Reset the flag after sending the request
    }
  }, [submitClicked, inputValue]); // Run the effect when submitClicked or inputValue changes


  return (
    <div className="homePage">
      <div className="quadrant">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Your vision" // Placeholder text for the input
          className="fullWidthInput" // Apply a class to make the input cover the entire quadrant
        />
        <button onClick={() => setSubmitClicked(true)}>Submit</button> {/* Set submitClicked to true when clicked */}
      </div>
      {/* Display slideshow */}
      {<SlideShow images={images} />}

      {/* Render images in specified quadrants
      {images.map((imageData, index) => {
        if ([2, 3, 4, 6, 7, 8].includes(index + 2)) { // Skip rendering for the 5th quadrant
          return (
            <div key={index + 2} className="quadrant">
              <img src={`data:image/png;base64,${imageData}`} alt={`Image ${index + 2}`} />
            </div>
          );
        } else {
          return null; // Skip rendering for the 5th quadrant
        }
      })} */}

    </div>
  );
}

export default HomePage;

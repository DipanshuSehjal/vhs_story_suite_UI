// utils/fetchImages.js
import JSZip from 'jszip';

const SERVER_URL = process.env.BACKEND_APP_SERVER_URL || 'http://localhost:5000';

/**
 * Handles the form submission for generating images from an uploaded image.
 * Sends a POST request to the server with form data, including the uploaded image.
 * @param {Event} e - The form submission event.
 */

// Using FormData with fetch API
// When sending form data containing files using the fetch API and FormData in JavaScript, it's important to handle the Content-Type header appropriately.

// Correct Approach
// When using FormData to send form data with files, do not manually set the Content-Type header to 'multipart/form-data'. 

// Instead, allow the fetch API to handle setting the Content-Type header automatically.

export const handleImageToImageSubmit = async (endpoint, formData, onImagesReceived) => {
  try {
    //console.log(formData)

    const response = await fetch(`${SERVER_URL}/api/${endpoint}`, {
      method: 'POST',
      body: formData // Use FormData as the request body
    });
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const blob = await response.blob();
    const zip = await JSZip.loadAsync(blob); // Load the received zip file
    const extractedImages = [];
    const promises = [];
    zip.forEach((relativePath, zipEntry) => {
      const promise = zip.files[zipEntry.name].async('blob').then((fileData) => {
        const imageUrl = URL.createObjectURL(fileData);
        extractedImages.push(imageUrl);
      });
      promises.push(promise);
    });
    await Promise.all(promises);
    console.log("Here  in handle submit")
    onImagesReceived(extractedImages); // Pass the extracted images to the callback function
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};


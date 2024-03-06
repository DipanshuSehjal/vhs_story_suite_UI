// utils/fetchTextToImage.js
import JSZip from 'jszip';

const SERVER_URL = process.env.BACKEND_APP_SERVER_URL || 'http://localhost:5000';

/**
 * Handles the form submission for generating images from a text form.
 * Sends a POST request to the server with form data. No image is included in the request
 * 
 * Sends JSON request
 * 
 * @param {Event} e - The form submission event.
 */

export const handleSubmit = async (endpoint, formData, onImagesReceived) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
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


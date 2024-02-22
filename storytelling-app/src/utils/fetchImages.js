// utils/fetchImages.js

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

const fetchImages = async (inputValue) => {
  try {
    const response = await fetch(`${SERVER_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: inputValue }) // Use the actual input value
    });
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    // Assuming the response contains a ZIP file
    const blob = await response.blob(); // Convert the response to a Blob
    return blob; // Return the Blob containing the ZIP file
  } catch (error) {
    throw error;
  }
};

export default fetchImages;

// ImageToImageForm.js
import React, { useState } from 'react';
import '../../css/ImageToImageForm.css'; // Import CSS file for styling
import { handleImageToImageSubmit } from '../../utils/fetchImageToImage';

/**
 * Component representing a form for image to image generation with an upload image field.
 * @param {function} onSubmit - Function to handle form submission.
 * 
 * 
 * Sends Form-data request with image file
 */
const ImageToImageForm = ({ onImagesReceived }) => {
  const endpoint = 'image-to-image';

  const [formData, setFormData] = useState({
    steps: '',
    width: '',
    height: '',
    seed: '',
    cfg_scale: '',
    samples: '',
    positivePrompt: '',
    negativePrompt: '',
    count: '1', // Default value set to '1'
    style: '',
    uploadImage: null, // Initialize uploaded image state
  });

 // Handle changes in regular form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes in the image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, uploadImage: file }); // Store the selected image
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.uploadImage) {
      alert("Please upload an image."); // Alert if no image is uploaded
      return;
    }

    const formDataToSend = new FormData();

    // Append existing form fields to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    await handleImageToImageSubmit(endpoint, formDataToSend, onImagesReceived);
  };

  return (
    <div className="form-container">
      
      <h2 className="form-title">Artwork Creation Tool</h2>
      <h3 className="form-title">Image to Image </h3>
      
        <form onSubmit={handleFormSubmit} className="image-form">
          {/* Form fields for image-to-image generation */}
          <div className="form-group">
            <label htmlFor="steps" className="form-label">Steps:</label>
            <input type="text" id="steps" name="steps" value={formData.steps} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="width" className="form-label">Width:</label>
            <input type="text" id="width" name="width" value={formData.width} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="height">Height:</label>
            <input type="text" id="height" name="height" value={formData.height} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="seed">Seed:</label>
            <input type="text" id="seed" name="seed" value={formData.seed} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="cfg_scale">CFG Scale:</label>
            <input type="text" id="cfg_scale" name="cfg_scale" value={formData.cfg_scale} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="samples">Samples:</label>
            <input type="text" id="samples" name="samples" value={formData.samples} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="positivePrompt">Positive Prompt:</label>
            <input type="text" id="positivePrompt" name="positivePrompt" value={formData.positivePrompt} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="negativePrompt">Negative Prompt:</label>
            <input type="text" id="negativePrompt" name="negativePrompt" value={formData.negativePrompt} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="style">Style:</label>
            <input type="text" id="style" name="style" value={formData.style} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="count">Count:</label>
            <input
              type="range"
              id="count"
              name="count"
              min="1"
              max="7"
              value={formData.count}
              onChange={handleChange}
            />
            <span>{formData.count}</span>
          </div>

          {/* Upload image field */}
          <div className="form-group">
            {/* Label for the image input */}
            <label htmlFor="uploadImage">Upload Image:</label>
            {/* Input for uploading the image */}
            <input 
              type="file" 
              id="uploadImage" 
              name="uploadImage"
              onChange={handleImageChange} 
              required // Make the image upload field mandatory         
            />
          </div>
  
          {/* Display uploaded image preview */}
          {formData.uploadImage && (
            <div className="mb-3">
              <img src={URL.createObjectURL(formData.uploadImage)} alt="Upload Image" className="upload-image" />
            </div>
          )}

          {/* Submit button */}
          <button type="submit">Imagine</button>

        </form>
    </div>
  );
};

export default ImageToImageForm;

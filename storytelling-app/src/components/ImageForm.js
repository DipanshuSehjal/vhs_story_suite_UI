import React, { useState } from 'react';
import JSZip from 'jszip'; // Import JSZip library
import '../css/ImageForm.css'; // Import CSS file for styling

/**
 * Component representing a form to submit image generation parameters.
 */
const ImageForm = ({ onImagesReceived }) => {
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
      style: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/api/text-to-image', {
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
        console.log("Here  in handle sumbit")
        onImagesReceived(extractedImages); // Pass the extracted images to the callback function
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    return (
      <div className="form-container">
          <h2 className="form-title">Artwork Creation Tool</h2>
          <form onSubmit={handleSubmit} className="image-form">
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

              <button type="submit">Submit</button>
          </form>
      </div>
    );
};

export default ImageForm;
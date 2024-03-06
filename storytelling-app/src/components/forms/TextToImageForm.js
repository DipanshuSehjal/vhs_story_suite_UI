import React, { useState } from 'react';
import JSZip from 'jszip'; // Import JSZip library
import '../../css/TextToImageForm.css'; // Import CSS file for styling
import { handleSubmit } from '../../utils/fetchTextToImage';


/**
 * Component representing a form to submit image generation parameters.
 * Sends JSON request
 */
const TextToImageForm = ({ onImagesReceived }) => {
    const endpoint = 'text-to-image';

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

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      await handleSubmit(endpoint, formData, onImagesReceived);
    };

    return (
      <div className="form-container">

          <h2 className="form-title">Artwork Creation Tool</h2>
          <h3 className="form-title">Text to Image </h3>

          <form onSubmit={handleFormSubmit} className="image-form">

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

              <button type="submit">Imagine</button>
              
          </form>
      </div>
    );
};

export default TextToImageForm;
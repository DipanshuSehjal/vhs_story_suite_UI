import React, { useState } from 'react';
import JSZip from 'jszip'; // Import JSZip library
import '../css/ImageForm.css'; // Import CSS file for styling

/**
 * Component representing a form to submit image generation parameters.
 */
const ImageForm = () => {
  const [formData, setFormData] = useState({
    steps: '',
    width: '',
    height: '',
    seed: '',
    cfg_scale: '',
    samples: '',
    positivePrompt: '',
    negativePrompt: '',
    multiple: '1', // Default value set to '1'
    random: ''
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e, handleImagesReceived) => {
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
      handleImagesReceived(extractedImages); // Pass the extracted images to the callback function
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="steps">Steps:</label>
    <input type="text" id="steps" name="steps" value={formData.steps} onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="width">Width:</label>
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
    <label htmlFor="random">Random:</label>
    <input type="text" id="random" name="random" value={formData.random} onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="multiple">Multiple:</label>
    <select id="multiple" name="multiple" value={formData.multiple} onChange={handleChange}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
    </select>
  </div>

  <button type="submit">Submit</button>

  {/* Render the images */}
  {images.length > 0 && (
    <div>
      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
      ))}
    </div>
  )}

</form>

  );
};


export default ImageForm;

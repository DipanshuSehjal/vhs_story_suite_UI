// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css'; // Import CSS file for styling

import TEXT2IMAGE from './images/text_to_image.jpeg'
import IMAGE2IMAGE from './images/img2img.jpeg'


const Home = () => {
  return (
    <div className="home-container">
      {/* Tile 1 */}
      <div className="tile-container">
        <Link to="/sketchboard/text-to-image" className="tile-link">
          <img src={TEXT2IMAGE} alt="Text To Image" className="tile-image" />
          <div className="tile-overlay">Text To Image</div>
        </Link>
      </div>

      {/* Tile 2 */}
      <div className="tile-container">
        <Link to="/sketchboard/image-to-image" className="tile-link">
          <img src={IMAGE2IMAGE} alt="Image To Image" className="tile-image" />
          <div className="tile-overlay">Image To Image</div>
        </Link>
      </div>

      {/* Tile 3 */}
      <div className="tile-container">
        <Link to="/sketchboard/text-to-image" className="tile-link">
          <img src={TEXT2IMAGE} alt="Tile 3" className="tile-image" />
          <div className="tile-overlay">Text To Image</div>
        </Link>
      </div>

      {/* Tile 4 */}
      <div className="tile-container">
        <Link to="/sketchboard/text-to-image" className="tile-link">
          <img src={TEXT2IMAGE} alt="Tile 4" className="tile-image" />
          <div className="tile-overlay">Tile 4</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

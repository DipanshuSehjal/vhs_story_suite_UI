import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import App.css file
import StoryApp from './components/StoryApp';
import Home from './Home';
import TextToImage from './components/TextToImage';
import ImageToImage from './components/ImageToImage';


// Import other components if needed

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<StoryApp />} />

          {/* Home will show tiles of what featue would you like to use*/}
          <Route path="/home" element={<Home />} />

          <Route path="/sketchboard/text-to-image" element={<TextToImage />} />
          <Route path="/sketchboard/image-to-image" element={<ImageToImage />} />

          
          
          {/* Add more routes for other components/pages */}
          {/* <Route path="/other" element={<OtherComponent />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
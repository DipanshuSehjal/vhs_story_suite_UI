import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import App.css file
import StoryApp from './components/StoryApp';
import HomePage from './components/HomePage'; // Import the HomePage component using camelCase
import TestSlideShow from './components/TestSlideShow';
import Home from './Home';
import ImageForm from './components/ImageForm';

// Import other components if needed

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<StoryApp />} />
          
          <Route path="/home" element={<Home />} />

          <Route path="/test" element={<TestSlideShow />} />
          <Route path="/text-to-image" element={<ImageForm />} />
          {/* Add more routes for other components/pages */}
          {/* <Route path="/other" element={<OtherComponent />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
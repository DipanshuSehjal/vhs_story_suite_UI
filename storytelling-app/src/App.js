import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import App.css file
import StoryApp from './components/StoryApp';
// Import other components if needed

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<StoryApp />} />
          {/* Add more routes for other components/pages */}
          {/* <Route path="/other" element={<OtherComponent />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
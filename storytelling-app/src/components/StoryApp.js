import React, { useState } from 'react';
import NewStoryForm from './NewStoryForm';
import StoryList from './StoryList';
import ParticleBackground from './ParticleBackground'; // Import ParticleBackground component
import fetchStories from '../utils/fetchStories';

const StoryApp = () => {
  const [stories, setStories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const handleGetStories = () => {
    fetchStories()
      .then(data => {
        setStories(data);
      })
      .catch(error => {
        console.error('Error fetching stories:', error.message);
      });
  };

  const handleSubmitStory = (newStory) => {
    // Send the new story data to the server
    fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStory)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit story');
      }
      // Handle successful submission
      console.log('Story submitted successfully');
      // Fetch updated list of stories from server and update state
      handleGetStories();
      // Reset form fields
      setTitle('');
      setDescription('');
      setGenre('');
    })
    .catch(error => {
      console.error('Error submitting story:', error.message);
    });
  };

  return (
    <div className="app-container">
      <ParticleBackground /> {/* Include ParticleBackground component */}
      <header>
        <h1>Interactive Storytelling Platform</h1>
      </header>
             
      <div className="main-content">
        <NewStoryForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          genre={genre}
          setGenre={setGenre}
          onSubmitStory={handleSubmitStory}
        />
        <button onClick={handleGetStories}>Get Stories</button>
        <StoryList stories={stories} />
      </div>
      
      <footer>
        <p>© 2024 Interactive Storytelling Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StoryApp;

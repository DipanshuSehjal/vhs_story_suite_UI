import React from 'react';

const StoryList = ({ stories }) => {
    // Check if stories is not an array, and return a message if true
    if (!Array.isArray(stories)) {
        return <div>No stories available</div>;
  }  

  return (
    <div className="story-list-container">
      <h2 style={{ color: 'white' }}>Explore Stories</h2>
      <div className="story-list">
        {stories.map((story, index) => (
          <div className="story-card" key={index}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            <p><strong>Genre:</strong> {story.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;

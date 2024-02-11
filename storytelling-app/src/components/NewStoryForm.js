import React, { useState } from 'react';

const NewStoryForm = ({ onSubmitStory }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new story object
    const newStory = {
      title,
      description,
      genre
    };
    // Call the onSubmitStory function passed from the parent component
    onSubmitStory(newStory);
    // Reset form fields
    setTitle('');
    setDescription('');
    setGenre('');
  };

  return (
    <div className="form-container">
      <h2>Create a New Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <button type="submit" className="create-story-button medium-button">Create Story</button>
      </form>
    </div>
  );
};

export default NewStoryForm;

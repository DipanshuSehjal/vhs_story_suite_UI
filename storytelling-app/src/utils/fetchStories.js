const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

const fetchStories = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/data`);
    if (!response.ok) {
      throw new Error('Failed to fetch stories');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default fetchStories;

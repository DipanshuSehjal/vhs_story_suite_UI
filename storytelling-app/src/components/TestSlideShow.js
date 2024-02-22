// Import the SlideShow component
import SlideShow from './SlideShow';

import image_1 from '../images/a_painting_of_man_waiting_for_hi_1.png';
import image_2 from '../images/a_painting_of_man_waiting_for_hi_2.png';
import image_3 from '../images/a_painting_of_man_waiting_for_hi_3.png';

// Render the SlideShow component with the sample image data
const TestSlideShow = () => {
  const sampleImages = [image_1, image_2, image_3];

  return (
    <div>
      <h2>Test SlideShow Component</h2>
      <SlideShow images={sampleImages} />
    </div>
  );
};

export default TestSlideShow;

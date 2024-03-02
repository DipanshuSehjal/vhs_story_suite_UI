// SlideShow.js
import React,  { useRef } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import '../css/SlideShow.css'; // Import the CSS from the src/css directory

const SlideShow = ({ images }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Adjust speed as needed
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext(); // Call slickNext() method to navigate to the next slide
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="custom-slider-container">`
    `
      {/* Custom Previous Arrow */}
      <button className="custom-prev-arrow" onClick={handlePrevClick}>&#10094;</button>
      
      {/* Slider Component */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </Slider>

      <button className="custom-next-arrow" onClick={handleNextClick}>&#10095;</button>

    </div>
  );
};

export default SlideShow;

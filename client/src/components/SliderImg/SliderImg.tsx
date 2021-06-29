import { useState } from 'react';
import "./sliderImg.css"
interface IProps {
    sliderData: string[]
  }
function ImageSlider ({ sliderData }:IProps) {
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;


  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

  return (
    <div className='slider-container'>
        <span className='left-arrow' onClick={prevSlide} > <i className="fas fa-arrow-left"></i></span>
        <span className='right-arrow' onClick={nextSlide} > <i className="fas fa-arrow-right"></i></span>
      {sliderData.map((slide, index) => {
          return (
            <div
              className={index === current ? 'slide active' : 'slide'}
              key={index}
              >
                {index === current && (
                <img src={slide} alt='Apartment img' className='image' />
                )}
            </div>
            );
            })}
    </div>
  );
};

export default ImageSlider;
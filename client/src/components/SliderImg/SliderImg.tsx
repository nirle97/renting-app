import { useState } from "react";
import "./sliderImg.css";
interface IProps {
  sliderData: string[];
  size: string;
}
function ImageSlider({ size, sliderData }: IProps) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === sliderData.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? sliderData.length - 1 : current - 1);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }

  return (
    <div
      className={
        size === "small" ? "slider-container-small" : "slider-container-big"
      }
    >
      <span className="left-arrow slider-btn" onClick={prevSlide}>
        {" "}
        <i className="fas fa-arrow-left slider-i"></i>
      </span>
      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img
                src={`${process.env.REACT_APP_BASE_URL}${slide}`}
                alt="Apartment img"
                className={size === "small" ? "image-small" : "image-big"}
              />
            )}
          </div>
        );
      })}
      <span className="right-arrow slider-btn" onClick={nextSlide}>
        {" "}
        <i className="fas fa-arrow-right slider-i"></i>
      </span>
    </div>
  );
}

export default ImageSlider;

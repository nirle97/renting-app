import { useState } from "react";
import "./sliderImg.css";
interface IProps {
  // sliderData: string[]
  size: string;
}
function ImageSlider({ size }: IProps) {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([
    "/images/apts/house0.jpg",
    "/images/apts/house1.jpg",
    "/images/apts/house2.jpg",
    "/images/apts/house3.jpg",
  ]);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
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
      {images.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img
                src={slide}
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

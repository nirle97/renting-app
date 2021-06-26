import { useState } from "react";
import "./apartment.css";
import { IApt } from "../../interfaces/interface";
interface IProps {
  apt: IApt;
  aptPreference: (preference: string) => void;
}

function Apartment({ apt, aptPreference }: IProps) {
  const [picToDisplay, setPicToDisplay] = useState<number>(0);

  return (
    <div className="Apartment-container">
      <div className="Apartment-top-img-and-buttons">
        {/* {picToDisplay !== 0 && ( */}
        <span
          className="Apartment-top-section-left-button Apartment-btn"
          onClick={() => setPicToDisplay((prev) => --prev)}
        >
          <i className="fas fa-arrow-left Apartment-btn-text"></i>
        </span>
        <div className="Apartment-img-div">
          <img
            className="Apartment-img"
            src={apt.imagesUrl[picToDisplay]}
            alt="apartment pics"
          />
        </div>
        {/* {picToDisplay !== apt.images.length - 1 && ( */}
        <span
          className="Apartment-top-section-right-button Apartment-btn"
          onClick={() => setPicToDisplay((prev) => ++prev)}
        >
          <i className="fas fa-arrow-right Apartment-btn-text"></i>
        </span>
      </div>
      <div className="Apartment-description">
        <span className="description-text">Address:{apt.address}</span>
        <span className="description-text">
          Price per month:{apt.pricePerMonth}
        </span>
      </div>

      <div className="Apartment-like-dislike-div">
        <span
          className="Apartment-thumbs-down-button Apartment-btn"
          onClick={() => aptPreference("dislikedBy")}
        >
          <i
            className="fa fa-thumbs-down Apartment-btn-text"
            aria-hidden="true"
          ></i>
        </span>
        <span
          className="Apartment-thumbs-up-button Apartment-btn"
          onClick={() => aptPreference("likedBy")}
        >
          <i
            className="fa fa-thumbs-up Apartment-btn-text"
            aria-hidden="true"
          ></i>
        </span>
      </div>
    </div>
  );
}

export default Apartment;

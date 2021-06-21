import React, { useState } from "react";
import "./apartment.css";
import { IApt } from "../../interfaces/interface";
import { useEffect } from "react";
interface IProps {
  apt: IApt;
  aptPreference: (preference: string ) => void ;
}

function Apartment({ apt, aptPreference }: IProps) {
  const [picToDisplay, setPicToDisplay] = useState<number>(0);

  return (
    <div className="Apartment-container">
      <div className="Apartment-top-section">
        <img
          className="Apartment-img"
          src={apt.images[picToDisplay]}
          alt="apartment pics"
        />

        {picToDisplay !== apt.images.length - 1 && (
          <span
            className="Apartment-top-section-right-button"
            onClick={() => setPicToDisplay((prev) => ++prev)}
          >
            <i className="fas fa-arrow-right"></i>
          </span>
        )}
        {picToDisplay !== 0 && (
          <span
            className="Apartment-top-section-left-button"
            onClick={() => setPicToDisplay((prev) => --prev)}
          >
            <i className="fas fa-arrow-left"></i>
          </span>
        )}
      </div>
      <div className="Apartment-description">
        <span>City:{apt.city}</span>
        <span>Price per month:{apt.pricePerMonth}</span>
      </div>


      <span
            className="Apartment-thumbs-up-button"
            onClick={() => aptPreference("likedBy")}
          >
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
      </span>
      <span
            className="Apartment-thumbs-down-button"
            onClick={() => aptPreference("dislikedBy")}
          >
            <i className="fa fa-thumbs-down" aria-hidden="true"></i>

      </span>

    </div>
  );
}

export default Apartment;

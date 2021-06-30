import { useState } from "react";
import "./apartment.css";
import { IApt, IUploadNewApt } from "../../interfaces/interface";
import ImageSlider from "../SliderImg/SliderImg";

interface IProps {
  apt: IUploadNewApt;
  aptPreference: (preference: string) => void;
}

function Apartment({ apt, aptPreference }: IProps) {
  return (
    <div className="Apartment-container">
      <div className="Apartment-img-desc">
        <div className="Apartment-img-and-buttons">
          <div className="Apartment-img-div">
            {/* <ImageSlider sliderData={apt.imagesUrl} /> */}
            <ImageSlider size="big" />
          </div>
        </div>
        <div className="Apartment-description-container">
          <div className="Apartment-description">
            <span className="description-text">Address:{apt.address}</span>
          </div>
          <div className="Apartment-description">
            <span className="description-text">
              Price per month: {apt.pricePerMonth}
            </span>
            <span className="description-text">
              Rental Type: {apt.rentalType}
            </span>
          </div>
          <div className="Apartment-description">
            <span className="description-text">
              Entry Date: {new Date(apt.entryDate).toLocaleDateString()}
            </span>
            <span className="description-text">
              CheckOut Date: {new Date(apt.entryDate).toLocaleDateString()}
            </span>
          </div>
          <div className="Apartment-description left">
            <span className="description-text">Size: {`${apt.size}m²`}</span>
            <span className="description-text">Rooms: {apt.rooms}</span>
            <span className="description-text">Floor: {apt.floor}</span>
          </div>
          <div className="Apartment-description left">
            <span className="description-text">
              Parking: {apt.parking ? "Yes" : "No"}
            </span>
            <span className="description-text">
              Porch: {apt.porch ? "Yes" : "No"}
            </span>
            <span className="description-text">
              Garden: {apt.garden ? "Yes" : "No"}
            </span>
          </div>
          <div className="Apartment-description">
            <span className="description-text">
              Furnished: {apt.furnished ? "Yes" : "No"}
            </span>
            <span className="description-text">
              Elevator: {apt.elevator ? "Yes" : "No"}
            </span>
            <span className="description-text">
              Handicap Accessible: {apt.handicapAccessible ? "Yes" : "No"}
            </span>
          </div>
          <div className="Apartment-description">
            <span className="description-text">
              Pets Allowed: {apt.petsAllowed ? "Yes" : "No"}
            </span>
            <span className="description-text">
              Smoke Allowed: {apt.smokeAllowed ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
      <div>
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
    </div>
  );
}

export default Apartment;

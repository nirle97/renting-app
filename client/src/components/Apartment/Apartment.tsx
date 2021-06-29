import { useState } from "react";
import "./apartment.css";
import { IApt, IUploadNewApt } from "../../interfaces/interface";
interface IProps {
  apt: IUploadNewApt;
  aptPreference: (preference: string) => void;
}

function Apartment({ apt, aptPreference }: IProps) {
  const [picToDisplay, setPicToDisplay] = useState<number>(0);
  const passImg = (status: string) => {
    if (status === "forward") {
      if (picToDisplay === apt.imagesUrl.length - 1) {
        setPicToDisplay(0);
      } else {
        setPicToDisplay((prev) => prev++);
      }
    } else {
      if (picToDisplay === 0) {
        setPicToDisplay(apt.imagesUrl.length - 1);
      } else {
        setPicToDisplay((prev) => prev--);
      }
    }
  };

  return (
    <div className="Apartment-container">
      <div className="Apartment-img-desc">
        <div className="Apartment-top-img-and-buttons">
          <span
            className="Apartment-top-section-left-button Apartment-btn"
            onClick={() => passImg("backward")}
          >
            <i className="fas fa-arrow-left Apartment-btn-text"></i>
          </span>
          <div className="Apartment-img-div">
            <img
              className="Apartment-img"
              src={`/images/apts/house${picToDisplay}.jpg`}
              // src={apt.imagesUrl[picToDisplay]}
              alt="apartment pics"
            />
          </div>
          <span
            className="Apartment-top-section-right-button Apartment-btn"
            onClick={() => passImg("forward")}
          >
            <i className="fas fa-arrow-right Apartment-btn-text"></i>
          </span>
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

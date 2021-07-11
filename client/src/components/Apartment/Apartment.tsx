import "./apartment.css";
import { IUploadNewApt } from "../../interfaces/interface";
import ImageSlider from "../SliderImg/SliderImg";

interface IProps {
  apt: IUploadNewApt;
  aptPreference: (preference: string) => void;
}

function Apartment({ apt, aptPreference }: IProps) {
  return (
    <div className="Apartment-apt-div">
      <div className="Apartment-img-div">
        <ImageSlider size="big" sliderData={apt.imagesUrl} />
      </div>
      <div className="Apartment-description-container">
        <div className="Apartment-description-main">
          <span className="description-text-span">{apt.title}</span>
          <span className="description-text-span">{apt.address}</span>
          <span className="Apartment-description-main-miniContainer">
            <span className="description-text">Size: {`${apt.size}m²`}</span>
            <span className="description-text">|</span>
            <span className="description-text">Rooms: {apt.rooms}</span>
            <span className="description-text">|</span>
            <span className="description-text">Floor: {apt.floor}</span>
          </span>
          <span className="description-text-span">
            {apt.pricePerMonth}₪/Per month
          </span>
          <span className="description-text-span">
            Entry Date: {new Date(apt.entryDate).toLocaleDateString()}
          </span>
          <span className="description-text-span">
            CheckOut Date: {new Date(apt.checkOutDate).toLocaleDateString()}
          </span>
        </div>
        <div className="Apartment-description-secondary">
          <div className="Apartment-description-secondary-left">
            <span className="description-secondary-text-span">
              Parking:{" "}
              {apt.parking ? (
                <i className="fas fa-check description-check"></i>
              ) : (
                <i className="fas fa-times description-un-check"></i>
              )}
            </span>
            <span className="description-secondary-text-span">
              Porch:{" "}
              {apt.porch ? (
                <i className="fas fa-check description-check"></i>
              ) : (
                <i className="fas fa-times description-un-check "></i>
              )}
            </span>
            <span className="description-secondary-text-span">
              Garden:{" "}
              {apt.garden ? (
                <i className="fas fa-check description-check"></i>
              ) : (
                <i className="fas fa-times description-un-check"></i>
              )}
            </span>
            <span className="description-secondary-text-span">
              Furnished:{" "}
              {apt.furnished ? (
                <i className="fas fa-check description-check"></i>
              ) : (
                <i className="fas fa-times description-un-check"></i>
              )}
            </span>
          </div>
          <div className="Apartment-description-secondary-right">
            <span className="description-secondary-text-span">
              Elevator:{" "}
              {apt.elevator ? (
                <i className="fas fa-check description-check"></i>
              ) : (
                <i className="fas fa-times description-un-check"></i>
              )}
            </span>
            <span className="description-secondary-text-span">
              Pets Allowed:{" "}
              {apt.petsAllowed ? (
                <i className="fas fa-check description-check"></i>
              ) : (
                <i className="fas fa-times description-un-check"></i>
              )}
            </span>
            <span className="description-secondary-text-span">
              Smoke Allowed:{" "}
              {apt.smokeAllowed ? (
                <i className="fas fa-check description-check"></i>
              ) : (
                <i className="fas fa-times description-un-check"></i>
              )}
            </span>
            <span className="description-secondary-text-span">
              Handicap Accessible:{" "}
              {apt.handicapAccessible ? (
                <i className="fas fa-check description-check"></i>
              ) : (
                <i className="fas fa-times description-un-check"></i>
              )}
            </span>
          </div>
        </div>
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

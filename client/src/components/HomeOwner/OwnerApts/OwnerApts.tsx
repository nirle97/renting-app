import { useState } from "react";
import "./ownerApts.css";
import { IUploadNewApt, IUser } from "../../../interfaces/interface";
import ImageSlider from "../../SliderImg/SliderImg";
import LikedUser from "../LikedUser/LikedUser";

interface IProps {
  apt: IUploadNewApt;
  aptsArr: IUploadNewApt[];
}
export default function OwnerApts({ apt, aptsArr }: IProps) {
  const [selectedAptId, setSelectedAptId] = useState("");
  const [likedUser, setLikedUser] = useState<IUser[]>();

  const openLikesList = (e: any) => {
    if (e.currentTarget.id === selectedAptId) {
      setSelectedAptId("");
      return;
    }
    const currentAptId = e.currentTarget.id;
    setSelectedAptId(currentAptId);
    const currentApt: IUploadNewApt | undefined = aptsArr?.find(
      (apt) => apt._id === currentAptId
    );
    if (currentApt) {
      const users = currentApt.likedByUser as IUser[];
      if (users.length) {
        setLikedUser([...users]);
      }
    }
  };

  return (
    <div className="HomeOwner-apt">
      <div className="HomeOwner-apt-div">
        <div className="HomeOwner-img-div">
          <ImageSlider size="small" sliderData={apt.imagesUrl} />
        </div>
        <div
          className="HomeOwner-description-container"
          id={apt._id}
          onClick={openLikesList}
        >
          <div className="HomeOwner-description-main">
            <span id="title" className="description-text-span">
              {apt.title}
            </span>
            <span className="description-text-span">{apt.address}</span>
            <span className="HomeOwner-description-main-miniContainer">
              <span className="description-text">
                Size: {` ${apt.size}m² `}
              </span>
              <span className="description-text"> | </span>
              <span className="description-text">
                Rooms: {` ${apt.rooms} `}
              </span>
              <span className="description-text"> | </span>
              <span className="description-text">
                Floor: {` ${apt.floor} `}
              </span>
            </span>
            <span className="description-text-span">
              {apt.pricePerMonth}₪/ month
            </span>
            <span className="description-text-span">
              Entry Date: {new Date(apt.entryDate).toLocaleDateString()}
            </span>
            <span className="description-text-span">
              End Date: {new Date(apt.checkOutDate).toLocaleDateString()}
            </span>
          </div>
          <div className="HomeOwner-description-secondary">
            <div className="HomeOwner-description-secondary-left">
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
            <div className="HomeOwner-description-secondary-right">
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
      </div>
      {selectedAptId === apt._id && (
        <div className="HomeOwner-apt-container">
          {!likedUser?.length && (
            <h3 id="no-likes-h3">No One Liked This Apartment Yet :(</h3>
          )}
          {likedUser?.map((user, i) => (
            <LikedUser
              key={i}
              likedUser={user}
              index={i}
              aptId={apt._id ? apt._id : ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}

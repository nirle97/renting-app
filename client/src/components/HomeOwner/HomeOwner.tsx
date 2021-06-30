import { useEffect, useState, useRef } from "react";
import network from "../../utils/network";
import { IUploadNewApt, IUser } from "../../interfaces/interface";
import "./homeOwner.css";
import ImageSlider from "../SliderImg/SliderImg";
import LikedUser from "./LikedUser";
export default function HomeOwner() {
  const [aptsArr, setAptsArr] = useState<IUploadNewApt[]>([]);
  const [selectedAptId, setSelectedAptId] = useState("");
  const [likedUser, setLikedUser] = useState<IUser[]>();
  const [userIndexToDisplay, setUserIndexToDisplay] = useState({
    min: 0,
    max: 3,
  });

  useEffect(() => {
    getOwnerApts();
  }, []);

  const getOwnerApts = async () => {
    const {
      data: { data },
    } = await network.get("/apartment/owner-apts");
    setAptsArr(data);
  };

  const clickedHandler = (e: any) => {
    const currentAptId = e.currentTarget.id;
    setSelectedAptId(currentAptId);
    const currentApt: IUploadNewApt | undefined = aptsArr?.find(
      (apt) => apt._id === currentAptId
    );
    if (currentApt) {
      const users = currentApt.likedByUser as IUser[];
      if (users.length) {
        setLikedUser([
          ...users,
          ...users,
          ...users,
          ...users,
          ...users,
          ...users,
          ...users,
          ...users,
        ]);
      }
    }
  };

  const nextUser = () => {
    userIndexToDisplay.min++;
    userIndexToDisplay.max++;
    setUserIndexToDisplay({ ...userIndexToDisplay });
  };

  const prevUser = () => {
    userIndexToDisplay.min--;
    userIndexToDisplay.max--;
    setUserIndexToDisplay({ ...userIndexToDisplay });
  };

  return (
    <div className="HomeOwner-container">
      {aptsArr.map((apt, i) => (
        <div key={`HomeOwner-${i}`} id={apt._id} onClick={clickedHandler}>
          <div className="HomeOwner-apt-div">
            <div className="HomeOwner-img-div">
              {/* <ImageSlider sliderData={apt.imagesUrl}/> */}
              <ImageSlider size="small" />
            </div>
            <div className="HomeOwner-description-container">
              <div className="HomeOwner-description-main">
                <span className="description-text-span">{apt.address}</span>
                <span className="HomeOwner-description-main-miniContainer">
                  <span className="description-text">
                    Size: {`${apt.size}m²`}
                  </span>
                  <span className="description-text"> | </span>
                  <span className="description-text">Rooms: {apt.rooms}</span>
                  <span className="description-text"> | </span>
                  <span className="description-text">Floor: {apt.floor}</span>
                </span>
                <span className="description-text-span">
                  {apt.pricePerMonth}₪/Per month
                </span>
                <span className="description-text-span">
                  Rental Type: {apt.rentalType}
                </span>
                <span className="description-text-span">
                  Entry Date: {new Date(apt.entryDate).toLocaleDateString()}
                </span>
                <span className="description-text-span">
                  CheckOut Date:{" "}
                  {new Date(apt.checkOutDate).toLocaleDateString()}
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
            <div className="HomeOwner-likes-div">
              <span className="HomeOwner-left-arrow" onClick={prevUser}>
                <i id="HomeOwner-arrow-i1" className="fas fa-arrow-left"></i>
              </span>
              {likedUser?.map(
                (user, i) =>
                  i >= userIndexToDisplay.min &&
                  i <= userIndexToDisplay.max && (
                    <LikedUser key={i} user={user} />
                  )
              )}
              <span className="HomeOwner-right-arrow" onClick={nextUser}>
                <i id="HomeOwner-arrow-i2" className="fas fa-arrow-right"></i>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

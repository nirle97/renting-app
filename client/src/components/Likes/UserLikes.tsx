import { useEffect, useState } from "react";
import "./userLikes.css";
import network from "../../utils/network";
import { IUploadNewApt } from "../../interfaces/interface";

export default function Likes() {
  const [aptsArr, setAptsArr] = useState<IUploadNewApt[]>([]);
  const [picToDisplay, setPicToDisplay] = useState<number>(0);

  useEffect(() => {
    getLikedApts();
  }, []);
  const getLikedApts = async () => {
    const {
      data: { data },
    } = await network.get("/apartment/user-liked-apts");
    setAptsArr(data);
  };
  return (
    <div className="Likes">
      {aptsArr.map((apt, i) => (
        <div key={`likedApt-${i}`} className="Likes-apt-div">
          <div className="Likes-img-div">
            <img
              className="Likes-img"
              // src={apt.imagesUrl[picToDisplay]}
              src={`/images/apts/house${picToDisplay}.jpg`}
              alt="Likes pics"
            />
          </div>
          <div className="Likes-description-container">
            <div className="Likes-description">
              <span className="description-text">Address:{apt.address}</span>
            </div>
            <div className="Likes-description">
              <span className="description-text">
                Price per month: {apt.pricePerMonth}
              </span>
              <span className="description-text">
                Rental Type: {apt.rentalType}
              </span>
            </div>
            <div className="Likes-description">
              <span className="description-text">
                Entry Date: {new Date(apt.entryDate).toLocaleDateString()}
              </span>
              <span className="description-text">
                CheckOut Date: {new Date(apt.entryDate).toLocaleDateString()}
              </span>
            </div>
            <div className="Likes-description left">
              <span className="description-text">Size: {`${apt.size}m²`}</span>
              <span className="description-text">Rooms: {apt.rooms}</span>
              <span className="description-text">Floor: {apt.floor}</span>
            </div>
            <div className="Likes-description left">
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
            <div className="Likes-description">
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
            <div className="Likes-description">
              <span className="description-text">
                Pets Allowed: {apt.petsAllowed ? "Yes" : "No"}
              </span>
              <span className="description-text">
                Smoke Allowed: {apt.smokeAllowed ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

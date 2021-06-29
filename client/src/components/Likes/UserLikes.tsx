import { useEffect, useState } from "react";
import "./userLikes.css";
import network from "../../utils/network";
import { IUploadNewApt } from "../../interfaces/interface";
import ImageSlider from "../SliderImg/SliderImg"

export default function Likes() {
  const [aptsArr, setAptsArr] = useState<IUploadNewApt[]>([]);

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
            {/* <ImageSlider sliderData={apt.imagesUrl}/> */}
            <ImageSlider size="small"/>
          </div>
          <div className="Likes-description-container">
            <div className="Likes-description-main">
              <span className="description-text-span">{apt.address}</span>
              <span className="Likes-description-main-miniContainer">
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
                Rental Type: {apt.rentalType}
              </span>
              <span className="description-text-span">
                Entry Date: {new Date(apt.entryDate).toLocaleDateString()}
              </span>
              <span className="description-text-span">
                CheckOut Date: {new Date(apt.checkOutDate).toLocaleDateString()}
              </span>
            </div>
            <div className="Likes-description-secondary">
              <div className="Likes-description-secondary-left">
                <span className="description-secondary-text-span">
                  Parking: {apt.parking ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                </span>
                <span className="description-secondary-text-span">
                  Porch: {apt.porch ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check "></i>}
                </span>
                <span className="description-secondary-text-span">
                  Garden: {apt.garden ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                </span>
                <span className="description-secondary-text-span">
                  Furnished: {apt.furnished ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                </span>
              </div>
              <div className="Likes-description-secondary-right">
                <span className="description-secondary-text-span">
                  Elevator: {apt.elevator ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                </span>
                <span className="description-secondary-text-span">
                  Pets Allowed: {apt.petsAllowed ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                </span>
                <span className="description-secondary-text-span">
                  Smoke Allowed: {apt.smokeAllowed ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                </span>
                <span className="description-secondary-text-span">
                  Handicap Accessible: {apt.handicapAccessible ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

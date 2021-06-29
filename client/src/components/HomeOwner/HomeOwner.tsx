import { useEffect, useState } from "react";
import network from "../../utils/network";
import { IUploadNewApt } from "../../interfaces/interface";
import "./homeOwner.css";
import ImageSlider from "../SliderImg/SliderImg"

export default function HomeOwner() {
  
  const [aptsArr, setAptsArr] = useState<IUploadNewApt[]>([]);
  useEffect(() => {
    getOwnerApts();
  }, []);
  const getOwnerApts = async () => {
    const {
      data: { data },
    } = await network.get("/apartment/owner-apts");
    setAptsArr(data);
    console.log(data);
    
  };
  return (
    <div className="HomeOwner-container">
      {aptsArr.map((apt, i) => (
        <div key={`likedApt-${i}`} className="HomeOwner-apt-container">
          {/* <div>
            {apt.likedByUser&& apt.likedByUser.map((user, i) => (
              <div>name: {user.fullName}</div>
              <div>age: {user.age}</div>
              <div>phoneNumber: {user.phoneNumber}</div>
              <div>email: {user.email}</div>
            ))}
          </div> */}
          <div className="HomeOwner-img-div">
            <ImageSlider sliderData={apt.imagesUrl}/>
          </div>
          <div className="HomeOwner-description-container">
            <div className="HomeOwner-description">
              <span className="description-text">Address:{apt.address}</span>
            </div>
            <div className="HomeOwner-description">
              <span className="description-text">
                Price per month: {apt.pricePerMonth}
              </span>
              <span className="description-text">
                Rental Type: {apt.rentalType}
              </span>
            </div>
            <div className="HomeOwner-description">
              <span className="description-text">
                Entry Date: {new Date(apt.entryDate).toLocaleDateString()}
              </span>
              <span className="description-text">
                CheckOut Date: {new Date(apt.entryDate).toLocaleDateString()}
              </span>
            </div>
            <div className="HomeOwner-description left">
              <span className="description-text">Size: {`${apt.size}m²`}</span>
              <span className="description-text">Rooms: {apt.rooms}</span>
              <span className="description-text">Floor: {apt.floor}</span>
            </div>
            {/* <div className="HomeOwner-description left">
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
            <div className="HomeOwner-description">
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
            <div className="HomeOwner-description">
              <span className="description-text">
                Pets Allowed: {apt.petsAllowed ? "Yes" : "No"}
              </span>
              <span className="description-text">
                Smoke Allowed: {apt.smokeAllowed ? "Yes" : "No"}
              </span>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

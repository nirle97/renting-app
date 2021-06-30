import { useEffect, useState } from "react";
import network from "../../utils/network";
import { IUploadNewApt } from "../../interfaces/interface";
import "./homeOwner.css";
import ImageSlider from "../SliderImg/SliderImg"

export default function HomeOwner() {
  
  const [aptsArr, setAptsArr] = useState<IUploadNewApt[]>([]);
  const [showUsers, setShowUsers] = useState([-1]);
 
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
    // const index = Number(e.target.value)
    // let temp = showUsers
    // showUsers.includes(index) ? temp.splice(temp.indexOf(index)) : temp.push(index)
    // setShowUsers(temp);
    // console.log(showUsers);
  }

  return (
    <div className="HomeOwner">
      {aptsArr.map((apt, i) => (
        <div>
          <div key={`HomeOwner-${i}`} className="HomeOwner-apt-div">
            <div className="HomeOwner-img-div">
              {/* <ImageSlider sliderData={apt.imagesUrl}/> */}
              <ImageSlider size="small"/>
            </div>
            <div className="HomeOwner-description-container" >
              <div className="HomeOwner-description-main">
                <span className="description-text-span">{apt.address}</span>
                <span className="HomeOwner-description-main-miniContainer">
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
              <div className="HomeOwner-description-secondary">
                <div className="HomeOwner-description-secondary-left">
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
                <div className="HomeOwner-description-secondary-right">
                  <span className="description-secondary-text-span">
                    Elevator: {apt.elevator ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                  </span>
                  <span className="description-secondary-text-span">
                    Pets Allowed: {apt.petsAllowed ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                  </span>
                  <span className="description-secondary-text-span">
                  </span>
                  <span className="description-secondary-text-span">
                    Handicap Accessible: {apt.handicapAccessible ? <i className="fas fa-check description-check"></i> : <i className="fas fa-times description-un-check"></i>}
                  </span>
                </div>
              </div>
            </div>
            <button value={"true"} onClick={clickedHandler}>show users</button>
            <div className="HomeOwner-users-container">
              asd
            </div>
        </div>
          </div>
      ))}
    </div>
  );
}

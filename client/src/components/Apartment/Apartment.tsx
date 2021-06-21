import React, {useState} from "react";
import "./apartment.css"
import { IApt } from "../../interfaces/interface"
import { useEffect } from "react";
interface IProps {
    apt: IApt 
  }
  
function Apartment({apt}:IProps) {
    const [picToDisplay, setPicToDisplay] = useState<number>(0)

   
     

  return (
  <div className="Apartment-container">
    <div className="Apartment-top-section">
        <img className="Apartment-img" src={apt.images[picToDisplay]}alt="apartment pics" />
        
        {picToDisplay !== apt.images.length -1  &&
            <button className="Apartment-top-section-right-button" onClick={() => setPicToDisplay(prev => ++prev )}><i className="fas fa-arrow-right"></i></button>
        }
        {picToDisplay !== 0 &&
            <button className="Apartment-top-section-left-button" onClick={() => setPicToDisplay(prev => --prev )}><i className="fas fa-arrow-left"></i></button>
        }
    </div>
    <div className="Apartment-description">
        <span>City:{apt.city}</span>
        <span>Price per month:{apt.pricePerMonth}</span>
    </div>
  </div>
  )
}

export default Apartment;

import React, { useState } from "react";
import "./uploadApt.css";
import { IUploadNewApt } from "../../interfaces/interface";
import { ownerFiltersObj } from "../../utils/utils";
import SearchBar from "../SearchBar/searchBar";
import OwnerPreferences from "../Preferences/OwnerPreferences"

export default function UploadApt() {
  const [openForm, setOpenForm] = useState(false);
  const [imgFiles, setImgFiles] = useState<{}[]>([]);
  const [formInput, setFormInput] = useState<IUploadNewApt>(ownerFiltersObj);
  const [searchValue, setSearchValue] = useState({
    cords: { lat: 0, lng: 0 },
    address: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({...formInput, [e.target.id]: e.target.value})
  };

  const uploadImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgFiles([...imgFiles, e.target.files[0]]);
    }
  };
  const submitHandler = () => {
    setOpenForm(false);
  };

  return (
    <div className="UploadApt-container">
      <span
        className="UploadApt-plus"
        onClick={() => setOpenForm((prev) => !prev)}
      >
        <i className="fas fa-plus-circle"></i>
      </span>
      {openForm && (
        <div className="UploadApt-form">
          <form>
            <div className="UploadApt-div-input">
              <label>address:</label>
              <SearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
            <div className="UploadApt-div-input">
              <label>Price / Month:</label>
              <input
                className="UploadApt-input"
                type="text"
                value={formInput.pricePerMonth}
                onChange={changeHandler}
                id="pricePerMonth"
                name="number"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>Images:</label>
              <input
                className="UploadApt-input"
                type="file"
                accept=".jpg,.jpeg,.png,.PNG"
                multiple
                onChange={uploadImgs}
                id="images"
                name="img"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>Rental Type:</label>
              <select
                ref={formInput.rentalType}
                className="UploadApt-input"
                id="rentalType"
                name="text"
                onChange={(e) => changeHandler}
              >
                <option value="short term">short term (1 - 6 months)</option>
                <option value="long term">long term</option>
              </select>
            </div>
            <div className="UploadApt-div-input">
              <label>Entry Date:</label>
              <input
                className="UploadApt-input"
                type="Date"
                onChange={changeHandler}
                id="entryDate"
                name="text"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>Check out date:</label>
              <input
                className="UploadApt-input"
                type="Date"
                onChange={changeHandler}
                id="checkOutDate"
                name="text"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>size(m²):</label>
              <input
                className="UploadApt-input"
                type="text"
                value={formInput.size}
                onChange={changeHandler}
                id="size"
                name="number"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>floor:</label>
              <input
                className="UploadApt-input"
                type="text"
                value={formInput.floor}
                onChange={changeHandler}
                id="floor"
                name="number"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>rooms:</label>
              <input
                className="UploadApt-input"
                type="text"
                value={formInput.rooms}
                onChange={changeHandler}
                id="rooms"
                name="number"
              />
            </div>
            <div>
              <OwnerPreferences formInput={formInput} setFormInput={setFormInput}/>
            </div>

          </form>
          <button onClick={submitHandler}>close</button>
        </div>
      )}
    </div>
  );
}

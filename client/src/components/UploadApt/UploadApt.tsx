import React, { useState, useEffect } from "react";
import "./uploadApt.css";
import { IUploadNewApt } from "../../interfaces/interface";
import { ownerFiltersObj } from "../../utils/utils";
import SearchBar from "../SearchBar/searchBar";
import OwnerPreferences from "../Preferences/OwnerPreferences"
import network from "../../utils/network";

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
  useEffect(()=> {
    setFormInput({...formInput, address: searchValue.address, cords:searchValue.cords})
  },[searchValue])

  const submitHandler = async () => {
   console.log(formInput);
   const a = await network.post("/apartment/create", formInput)
   console.log(a);
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
                searchBarClass="UploadApts-search"
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
            <div>
              <OwnerPreferences formInput={formInput} setFormInput={setFormInput}/>
            </div>

          </form>
          <button onClick={submitHandler}>submit</button>
        </div>
      )}
    </div>
  );
}

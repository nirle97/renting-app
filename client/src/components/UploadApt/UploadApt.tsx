import React, { useState } from "react";
import "./uploadApt.css";
import { IUploadNewApt } from "../../interfaces/interface";
import { ownerFiltersObj } from "../../utils/utils";
import SearchBar from "../SearchBar/searchBar";
export default function UploadApt() {
  const [openForm, setOpenForm] = useState(false);
  const [imgFiles, setImgFiles] = useState<{}[]>([]);
  const [formInput, setFormInput] = useState<IUploadNewApt>(ownerFiltersObj);
  const [searchValue, setSearchValue] = useState({
    cords: { lat: 0, lng: 0 },
    address: "",
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.target.name]:
        e.target.name === "pricePerMonth"
          ? Number(e.target.value)
          : e.target.value,
    });
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
                name="pricePerMonth"
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
                name="images"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>Rental Type:</label>
              <select
                ref={formInput.rentalType}
                className="UploadApt-input"
                name="rentalType"
                // onChange={changeHandler}
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
                name="entryDate"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>Check out date:</label>
              <input
                className="UploadApt-input"
                type="Date"
                onChange={changeHandler}
                name="checkOutDate"
              />
            </div>
          </form>
          <button onClick={submitHandler}>close</button>
        </div>
      )}
    </div>
  );
}
// {
//   rentalType: string;
//   entryDate: Date;
//   checkOutDate: Date;
//   size: number;
//   floor: number;
//   rooms: number;
//   parking: boolean;
//   porch: boolean;
//   garden: boolean;
//   furnished: boolean;
//   elevator: boolean;
//   handicapAccessible: boolean;
//   petsAllowed: boolean;
//   smokeAllowed: boolean;
// }

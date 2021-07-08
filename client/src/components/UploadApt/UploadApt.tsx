import React, { useState, useEffect } from "react";
import "./uploadApt.css";
import { IUploadNewApt } from "../../interfaces/interface";
import { ownerFiltersObj } from "../../utils/utils";
import OwnerPreferences from "../Preferences/OwnerPreferences";
import network from "../../utils/network";
import { setIsDataLoading } from "../../store/spinnerSlice";
import { useDispatch } from "react-redux";
import Map from "../Map/Map";
import { useHistory } from "react-router-dom";
import SearchBar from "../SearchBar/searchBar";
export default function UploadApt() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [files, setFiles] = useState<any>();
  const [images, setImages] = useState([]);
  const [formInput, setFormInput] = useState<IUploadNewApt>(ownerFiltersObj);
  const [searchValue, setSearchValue] = useState({
    cords: { lat: 0, lng: 0 },
    address: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.target.id]: e.target.value,
    });
  };

  const setImgsToUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "apt-images" && e.target.files) {
      setFiles(e.target.files);
    }
  };
  async function postImage(
    files: any,
    description: string,
    aptId: string
  ): Promise<void> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("apt-images", files[i]);
    }
    formData.append("description", aptId);
    try {
      const result = await network.post(
        `${process.env.REACT_APP_BASE_URL}/apartment/owner-apts-images`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImages(result.data.data);
      return result.data.data;
    } catch (e) {
      dispatch(setIsDataLoading({ isDataLoading: false }));
    }
  }

  const submitHandler = async (e: any) => {
    try {
      e.target.hidden = true;
      setFormInput({ ...formInput, imagesUrl: images });
      const { data: newApt } = await network.post(
        `${process.env.REACT_APP_BASE_URL}/apartment/create`,
        formInput
      );
      if (files) {
        await postImage(files, "AptsImg", newApt.data.id);
      }
      e.target.hidden = false;
      history.push("/");
      setFormInput(ownerFiltersObj);
    } catch (e) {
      // dispatch(setIsDataLoading({ isDataLoading: false }));
    }
  };

  useEffect(() => {
    setFormInput({
      ...formInput,
      address: searchValue.address,
      cords: searchValue.cords,
    });
  }, [searchValue]);
  return (
    <div className="UploadApt-container">
      <div className="UploadApt-form">
        <form>
          <div className="UploadApt-left-side">
            <div className="UploadApt-div-input">
              <label>Title: </label>
              <input
                type="text"
                id="title"
                value={formInput.title}
                onChange={changeHandler}
                maxLength={30}
                className="UploadApt-input"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>Address: </label>
              <SearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchBarClass="UploadApts-search"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>Price / Month (₪):</label>
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
              <label>Size(m²):</label>
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
              <label>Floor:</label>
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
              <label>Rooms:</label>
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
                onChange={setImgsToUpload}
                id="images"
                name="apt-images"
              />
            </div>
            <div className="UploadApt-div-input">
              <label> From:</label>
              <input
                className="UploadApt-input date-input"
                id="entryDate"
                type="date"
                onChange={changeHandler}
                value={formInput.entryDate}
              />
              <label>To:</label>
              <input
                className="UploadApt-input date-input"
                id="checkOutDate"
                type="date"
                onChange={changeHandler}
                value={formInput.checkOutDate}
              />
            </div>
          </div>
          <div className="UploadApt-right-side">
            <div className="UploadApt-right-side-title">
              {" "}
              Please select apartment attribute
            </div>
            <div className="UploadApt-OwnerPreferences-component">
              <OwnerPreferences
                formInput={formInput}
                setFormInput={setFormInput}
              />
            </div>
            <div className="UploadApt-map">
              <Map cords={formInput.cords} isUpload={true} />
            </div>
          </div>
        </form>
        <button className="UploadApt-submit-button" onClick={submitHandler}>
          submit
        </button>
      </div>
    </div>
  );
}

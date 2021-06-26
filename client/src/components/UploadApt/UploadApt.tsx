import React, { useState, useEffect } from "react";
import "./uploadApt.css";
import { IUploadNewApt } from "../../interfaces/interface";
import { ownerFiltersObj } from "../../utils/utils";
import SearchBar from "../SearchBar/searchBar";
import OwnerPreferences from "../Preferences/OwnerPreferences";
import network from "../../utils/network";
import axios from "axios";
export default function UploadApt() {
  const [files, setFiles] = useState<any>();
  const [images, setImages] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formInput, setFormInput] = useState<IUploadNewApt>(ownerFiltersObj);
  const [searchValue, setSearchValue] = useState({
    cords: { lat: 0, lng: 0 },
    address: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  const setImgsToUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "apt-images" && e.target.files) {
      setFiles(e.target.files);
    }
  };
  async function postImage(files: any, description: any): Promise<void> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("apt-images", files[i]);
    }
    formData.append("description", description);
    const result = await network.post(
      "/apartment/owner-apts-images",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setImages(result.data.data);
    return result.data.data;
  }

  const submitHandler = async () => {
    if (files) {
      const url = await postImage(files, "AptsImg");
    }
    setFormInput({ ...formInput, imagesUrl: images });
    await network.post("/apartment/create", formInput);
    setOpenForm(false);
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
                onChange={setImgsToUpload}
                id="images"
                name="apt-images"
              />
            </div>
            <div>
              <OwnerPreferences
                formInput={formInput}
                setFormInput={setFormInput}
              />
            </div>
          </form>
          <button onClick={submitHandler}>submit</button>
        </div>
      )}
    </div>
  );
}

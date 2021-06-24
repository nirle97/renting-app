import React, { useState } from "react";
import "./uploadApt.css";
import { IUploadNewApt } from "../../interfaces/interface";

export default function UploadApt() {
  const [openForm, setOpenForm] = useState(false);
  const [imgFiles, setImgFiles] = useState<{}[]>([]);
  const [formInput, setFormInput] = useState<IUploadNewApt>({
    city: "",
    price: 0,
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.target.name]:
        e.target.name === "price" ? Number(e.target.value) : e.target.value,
    });
  };
  const uploadImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgFiles([...imgFiles, e.target.files[0]]);
    }
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
              <label>City:</label>
              <input
                className="UploadApt-input"
                type="text"
                value={formInput.city}
                onChange={changeHandler}
                name="city"
              />
            </div>
            <div className="UploadApt-div-input">
              <label>Price / Month:</label>
              <input
                className="UploadApt-input"
                type="text"
                value={formInput.price}
                onChange={changeHandler}
                name="price"
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
                name="price"
              />
            </div>
          </form>
          <button onClick={() => setOpenForm(false)}>close</button>
        </div>
      )}
    </div>
  );
}

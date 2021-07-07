import axios from "axios";
import React, { useState } from "react";

export default function FileChat() {
  const [file, setFile] = useState<string | Blob>("");
  const [image, setImages] = useState("");
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "imgUrl" && e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  async function postImage(
    image: string | Blob,
    description: string
  ): Promise<void> {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/login/profile-image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setImages(result.data.data);
    return result.data.data;
  }
  return (
    <>
      <input
        className="FileChat-input"
        id="upload-pic"
        type="file"
        onChange={changeHandler}
        name="imgUrl"
        style={{ display: "none" }}
      />
    </>
  );
}

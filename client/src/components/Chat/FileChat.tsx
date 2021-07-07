import axios from "axios";
import React, { useState } from "react";
import "./fileChat.css";
interface IProps {
  setSelectedfile: React.Dispatch<React.SetStateAction<File | null>>;
  selectedfile: File | null;
}
export default function FileChat({ setSelectedfile, selectedfile }: IProps) {
  const [file, setFiles] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);

      setSelectedfile(e.target.files[0]);
    }
  };

  async function sendFile(
    file: string | Blob,
    description: string
  ): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/message/send-file`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setFiles(result.data.data);
    return result.data.data;
  }
  const removeFile = (e: any) => {
    e.preventDefault();
    setSelectedfile(null);
  };
  return (
    <>
      <span className="FileChat-upload-span">
        {selectedfile ? (
          <i onClick={removeFile} className="fas fa-times"></i>
        ) : (
          <>
            <i className="fas fa-paperclip"></i>
            <input
              className="FileChat-input"
              id="upload-pic"
              type="file"
              onChange={changeHandler}
              name="imgUrl"
            />
          </>
        )}
      </span>
    </>
  );
}

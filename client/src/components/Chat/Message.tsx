import React from "react";
import "./message.css";
import { IMessage } from "../../interfaces/interface";

export default function Message({ message }: {message: IMessage}) {
  return (
    <>
      <div className="Message-left">
        <span className="Message-wrapper">
          <span className="Message-img"></span>
          <span>{message.text}</span>
          <span>{message.createdAt}</span>
        </span>
      </div>
    </>
  );
}

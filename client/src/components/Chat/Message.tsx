import React, { useEffect, useState } from "react";
import "./message.css";
import { IMessage } from "../../interfaces/interface";
import { userSelectors } from "../../store/userSlice";
import { useSelector } from "react-redux";
import { chatSelectors } from "../../store/chatSlice";
import { Link } from "react-router-dom";

export default function Message({
  message,
  roomId,
}: {
  message: IMessage;
  roomId: string | null;
}) {
  const { user } = useSelector(userSelectors);
  const [isMsgSent, setIsMsgSent] = useState(true);

  function msToHoursMintues(ms: number) {
    let hours: number = new Date(ms).getHours();
    let minutes: string | number = new Date(ms).getMinutes();
    if (minutes < 10) {
      minutes = 0;
    }
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    if (message.senderId === user.id) {
      setIsMsgSent(true);
    } else {
      setIsMsgSent(false);
    }
  }, []);

  return (
    <>
      {roomId === message.chatRoomId && (
        <div
          className={`Message-container ${
            isMsgSent ? "Message-right" : "Message-left"
          }`}
        >
          <span className={`Message-wrapper ${isMsgSent ? "right" : "left"}`}>
            {message.path ? (
              <a
                href={`${process.env.REACT_APP_BASE_URL}${message.path}`}
                download
              >
                <div className="Message-text">
                  {`${message.text}  `}
                  <i className="fas fa-download"></i>
                </div>
              </a>
            ) : (
              <div className="Message-text">{message.text}</div>
            )}
            <span className="Message-time">
              <i>{msToHoursMintues(message.createdAt)}</i>
            </span>
          </span>
        </div>
      )}
    </>
  );
}

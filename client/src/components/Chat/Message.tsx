import React, { useEffect, useState } from "react";
import "./message.css";
import { IMessage } from "../../interfaces/interface";
import { userSelectors } from "../../store/userSlice";
import { useSelector } from "react-redux";
interface IProps {
  currentRoom: string;
  message: IMessage;
}
export default function Message({ message, currentRoom }: IProps) {
  const { user } = useSelector(userSelectors);
  const [isMsgSent, setIsMsgSent] = useState(true);

  function msToHoursMintues(ms: Date) {
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
      {isMsgSent ? (
        <div className="Message-right">
          <span className="Message-wrapper">
            <span>{message.text}</span>
            <span>{msToHoursMintues(message.createdAt)}</span>
          </span>
        </div>
      ) : (
        <div className="Message-left">
          <span className="Message-wrapper">
            <span>{message.text}</span>
            <span>{msToHoursMintues(message.createdAt)}</span>
          </span>
        </div>
      )}
    </>
  );
}

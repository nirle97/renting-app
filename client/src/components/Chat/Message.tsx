import React, { useEffect, useState } from "react";
import "./message.css";
import { IMessage } from "../../interfaces/interface";
import { userSelectors } from "../../store/userSlice";
import { useSelector } from "react-redux";
import { chatSelectors } from "../../store/chatSlice";

export default function Message({
  message,
  roomId,
}: {
  message: IMessage;
  roomId: string | null;
}) {
  const { user } = useSelector(userSelectors);
  const [isMsgSent, setIsMsgSent] = useState(true);
  const { currentChatRoom } = useSelector(chatSelectors);

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
        <div className={isMsgSent ? "Message-right" : "Message-left"}>
          <span className="Message-wrapper">
            <span>{msToHoursMintues(message.createdAt)}</span>
            <span>{message.text}</span>
          </span>
        </div>
      )}
    </>
  );
}

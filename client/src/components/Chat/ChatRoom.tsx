import { useEffect, useState } from "react";
import network from "../../utils/network";
import { IChatRoom } from "../../interfaces/interface";
import "./chatRoom.css";
interface IProps {
  room: IChatRoom;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
}
export default function ChatRoom({ room, setCurrentRoom }: IProps) {
  return (
    <div onClick={()=>setCurrentRoom(room._id ? room._id : "")}>
      <div className="ChatRoom-room-div">
        <span className="ChatRoom-room-title">{room.title}</span>
        <span className="ChatRoom-room-name">{`${room.participants.userInfo.fullName} - ${room.participants.ownerInfo.fullName}`}</span>
      </div>
    </div>
  );
}

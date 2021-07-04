import "./chatRoom.css";
import { useDispatch, useSelector } from "react-redux";
import { IChatRoom } from "../../interfaces/interface";
import { chatSelectors, setChatRoom } from "../../store/chatSlice";
import { useEffect, useRef, useState } from "react";

export default function ChatRoom({ room }: { room: IChatRoom }) {
  const dispatch = useDispatch();
  const { currentChatRoom } = useSelector(chatSelectors);
  const roomDiv = useRef<HTMLDivElement>(null);
  let prevRoomDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (currentChatRoom === room._id) {
      roomDiv.current?.classList.toggle("selected-room");
    }
  }, []);

  const selectRoom = (e: any) => {
    if (!e.currentTarget.classList.contains("selected-room")) {
      dispatch(setChatRoom({ currentChatRoom: room._id ? room._id : "" }));
      e.currentTarget.classList.toggle("selected-room");
      prevRoomDiv.current?.classList.toggle("selected-room");
      prevRoomDiv = roomDiv
    } else {
      dispatch(setChatRoom({ currentChatRoom: "" }));
      e.currentTarget.classList.toggle("selected-room");
    }
  };
  return (
    <div onClick={(e) => selectRoom(e)} ref={roomDiv}>
      <div className="ChatRoom-room-div">
        <span className="ChatRoom-room-title">{room.title}</span>
        <span className="ChatRoom-room-name">{`${room.participants.userInfo.fullName} - ${room.participants.ownerInfo.fullName}`}</span>
      </div>
    </div>
  );
}

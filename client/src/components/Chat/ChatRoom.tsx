import "./chatRoom.css";
import { useDispatch, useSelector } from "react-redux";
import { IChatRoom } from "../../interfaces/interface";
import { chatSelectors, setChatRoom } from "../../store/chatSlice";
import { useEffect, useRef, useState } from "react";

export default function ChatRoom({
  room,
  setSelectedRoom,
  setRoomId,
}: {
  room: IChatRoom;
  setSelectedRoom: React.Dispatch<
    React.SetStateAction<(EventTarget & HTMLDivElement) | undefined>
  >;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useDispatch();
  const { currentChatRoom } = useSelector(chatSelectors);
  const roomDiv = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (currentChatRoom === room._id) {
  //     roomDiv.current?.classList.toggle("selected-room");
  //   }
  // }, []);

  const selectRoom = (e: any) => {
    const clickedDiv = e.currentTarget;
    setSelectedRoom((prev): any => {
      if (prev) {
        if (prev.isSameNode(clickedDiv)) {
          clickedDiv?.classList.toggle("selected-room");
          setSelectedRoom(clickedDiv);
          setRoomId("");
        } else {
          prev?.classList.toggle("selected-room");
          clickedDiv?.classList.toggle("selected-room");
          setSelectedRoom(clickedDiv);
          setRoomId(room._id ? room._id : "");
        }
      } else {
        clickedDiv?.classList.toggle("selected-room");
        setSelectedRoom(clickedDiv);
        setRoomId(room._id ? room._id : "");
      }
      // setClickedRoom((prev): any => {
      //   if (prev) {
      //     if (prev.isSameNode(clickedDiv)) {
      //       clickedDiv?.classList.toggle("selected-room");
      //       setClickedRoom(clickedDiv);
      //       dispatch(setChatRoom({ currentChatRoom: "" }));
      //     } else {
      //       prev?.classList.toggle("selected-room");
      //       clickedDiv?.classList.toggle("selected-room");
      //       setClickedRoom(clickedDiv);
      //       dispatch(setChatRoom({ currentChatRoom: room._id ? room._id : "" }));
      //     }
      //   } else {
      //     dispatch(setChatRoom({ currentChatRoom: room._id ? room._id : "" }));
      //     clickedDiv?.classList.toggle("selected-room");
      //     setClickedRoom(clickedDiv);
      //   }
    });
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

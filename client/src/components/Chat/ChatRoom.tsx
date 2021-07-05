import "./chatRoom.css";
import { IChatRoom } from "../../interfaces/interface";
import { useEffect, useRef, useState } from "react";
interface IProps {
  room: IChatRoom;
  setSelectedRoom: React.Dispatch<
    React.SetStateAction<(EventTarget & HTMLDivElement) | undefined | null>
  >;
  setRoomId: React.Dispatch<React.SetStateAction<string | null>>;
  roomId: string | null;
}

export default function ChatRoom({
  room,
  setSelectedRoom,
  setRoomId,
  roomId,
}: IProps) {
  const roomDiv = useRef<EventTarget & HTMLDivElement>(null);
  const [selectedStyle, setSelectedStyle] = useState(false);

  useEffect(() => {
    if (roomId === room._id) {
      setSelectedRoom(roomDiv.current);
      setSelectedStyle(true);
    }
  }, [roomId]);

  const selectRoom = (e: any) => {
    const clickedDiv = e.currentTarget;
    setSelectedRoom((prev): any => {
      if (prev) {
        if (prev?.isSameNode(clickedDiv)) {
          setSelectedStyle(false);
          setRoomId("");
          return;
        } else {
          prev?.classList.remove("selected-room");
          setSelectedStyle(true);
          setRoomId(room._id ? room._id : "");
          if (clickedDiv) return clickedDiv;
        }
      } else {
        // setSelectedStyle(true);
        setRoomId(room._id ? room._id : "");
        if (clickedDiv) return clickedDiv;
      }
    });
  };
  return (
    <div
      onClick={(e) => selectRoom(e)}
      ref={roomDiv}
      className={selectedStyle ? "selected-room" : ""}
    >
      <div className="ChatRoom-room-div">
        <span className="ChatRoom-room-title">{room.title}</span>
        <span className="ChatRoom-room-name">{`${room.participants.userInfo.fullName} - ${room.participants.ownerInfo.fullName}`}</span>
      </div>
    </div>
  );
}

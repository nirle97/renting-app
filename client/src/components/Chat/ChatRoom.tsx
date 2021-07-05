import "./chatRoom.css";
import { IChatRoom } from "../../interfaces/interface";
import { useEffect, useRef, useState } from "react";
import { userSelectors } from "../../store/userSlice";
import { useSelector } from "react-redux";
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
  const { user } = useSelector(userSelectors);

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
          prev?.classList.remove("selected-room");
          setSelectedStyle(false);
          setRoomId("");
          return;
        } else {
          prev?.classList.remove("selected-room");
          clickedDiv.classList.add("selected-room");
          setRoomId(room._id ? room._id : "");
          if (clickedDiv) return clickedDiv;
        }
      } else {
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
        <img className="ChatRoom-room-img" src={`${user.isOwner? room.participants.userInfo.imgUrl : room.participants.ownerInfo.imgUrl}`} alt="sender profile image" />
        <span className="ChatRoom-room-name">{`${user.isOwner? room.participants.userInfo.fullName : room.participants.ownerInfo.fullName}`}</span>
      </div>
    </div>
  );
}

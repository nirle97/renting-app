import "./chatRoom.css";
import { IChatRoom } from "../../interfaces/interface";
import { useEffect, useRef, useState } from "react";
import { userSelectors } from "../../store/userSlice";
import { useSelector } from "react-redux";
import network from "../../utils/network";
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

  const deleteChat = async () => {
    const userAnswer = window.confirm(
      "Are you sure you want to delete all the chat history? This action has no undo option"
    );
    if (userAnswer) {
      console.log(room._id);

      await network.delete(`/chat-room/delete-room/${room._id}`);
    }
  };

  return (
    <div
      onClick={(e) => selectRoom(e)}
      ref={roomDiv}
      className={selectedStyle ? "selected-room" : ""}
    >
      <div className="ChatRoom-room-div">
        <img
          className="ChatRoom-room-img"
          src={`${
            user.isOwner
              ? room.participants.userInfo.imgUrl
              : room.participants.ownerInfo.imgUrl
          }`}
          alt="sender profile"
        />
        <span className="ChatRoom-room-name">
          {`${
            user.isOwner
              ? room.participants.userInfo.fullName
              : room.participants.ownerInfo.fullName
          } - `}
        </span>
        <span className="ChatRoom-room-addresses">
          {room.addresses.map((address, i) => {
            if (i === room.addresses.length - 1) {
              return <span key={i}>{` ${address} `}</span>;
            } else {
              return <span key={i}>{` ${address} |`}</span>;
            }
          })}
        </span>
        <span className="ChatRoom-room-delete" onClick={deleteChat}>
          <i className="fas fa-trash"></i>
        </span>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import network from "../../utils/network";
import { IChatRoom } from "../../interfaces/interface"
import "./chatRoom.css"
export default function ChatRoom() {
const [roomsArray,setRoomsArray] = useState<IChatRoom[]>([])
  const getRooms = async () => {
    const { data: rooms } = await network.get("/chat-room/get-rooms");
    setRoomsArray(rooms.data)
  };
  useEffect(() => {
    getRooms();
  },[]);

  return (
  <div> 
    {roomsArray.map((room: IChatRoom) => {
      return(
        <div className="ChatRoom-room-div">
          <span className="ChatRoom-room-title">{room.title}</span>
          {}
          <span className="ChatRoom-room-name">{`${room.participants.userInfo.fullName} - ${room.participants.ownerInfo.fullName}`}</span>
        </div>
      )
    }
    )}
  </div>
  );
}

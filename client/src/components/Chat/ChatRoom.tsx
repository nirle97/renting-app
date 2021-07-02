import { useEffect } from "react";
import network from "../../utils/network";
export default function ChatRoom() {
  const getRooms = async () => {
    const { data: rooms } = await network.get("/chat-room/get-rooms");
    console.log(rooms);
  };
  useEffect(() => {
    getRooms();
  });

  return <div>hi</div>;
}

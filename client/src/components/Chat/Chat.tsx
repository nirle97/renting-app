import "./chat.css";
import { useEffect, useRef, useState } from "react";
import ChatRoom from "./ChatRoom";
import { userSelectors } from "../../store/userSlice";
import { useSelector } from "react-redux";
import network from "../../utils/network";
import { IChatRoom, IMessage } from "../../interfaces/interface";
import io, { Socket } from "socket.io-client";
import Message from "./Message";
const ENDPOINT = "localhost:5000";

export default function Chat() {
  const [roomsArray, setRoomsArray] = useState<IChatRoom[]>([]);
  const [roomsIdArray, setRoomsIdArray] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const { user } = useSelector(userSelectors);
  const scrollDown = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    const { data: rooms } = await network.get("/chat-room/get-rooms");
    const roomsId: string[] = [];
    rooms.data.forEach((room: IChatRoom) => {
      if (room._id) {
        roomsId.push(room._id);
      }
    });
    setRoomsIdArray(roomsId);
    setRoomsArray(rooms.data);
  };

  useEffect(() => {
    socketRef.current = io(ENDPOINT);
    socketRef.current?.emit("join-chat", roomsIdArray);
  }, [roomsIdArray]);

  useEffect(() => {
    socketRef.current?.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    const msgObj = {
      text: msg,
      chatRoomId: currentRoom,
      senderId: user.id,
      createdAt: new Date().getTime(),
    };
    if (msg) {
      socketRef.current?.emit("send-msg", msgObj, () => setMsg(""));
    }
    scrollDown.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="Chat-container">
      <div className="chat-messages-container">
        {messages.map((message, i) => (
          <Message key={i} message={message} currentRoom={currentRoom} />
        ))}
        <div className="msg-div">
          <div ref={scrollDown}></div>
          <form className="msg-form">
            <input
              className="msg-input"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={(e) => (e.key === "enter" ? sendMessage(e) : null)}
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="send-btn"
              onClick={(e) => sendMessage(e)}
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="Chat-rooms-container">
        {roomsArray.map((room: IChatRoom, i) => {
          return (
            <ChatRoom key={i} room={room} setCurrentRoom={setCurrentRoom} />
          );
        })}
      </div>
    </div>
  );
}

import "./chat.css";
import { useEffect, useRef, useState } from "react";
import ChatRoom from "./ChatRoom";
import { userSelectors } from "../../store/userSlice";
import { useSelector } from "react-redux";
import network from "../../utils/network";
import { IChatRoom, IMessage } from "../../interfaces/interface";
import io from "socket.io-client";
import Message from "./Message";
import { useLocation } from "react-router";
const ENDPOINT = "localhost:5001";
const socket = io(ENDPOINT, {
  transports: ["websocket"],
});
export default function Chat() {
  const search = useLocation().search;
  const userId = new URLSearchParams(search).get("user");
  const [selectedRoom, setSelectedRoom] = useState<
    (EventTarget & HTMLDivElement) | null
  >();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [roomsArray, setRoomsArray] = useState<IChatRoom[]>([]);
  const [roomsIdArray, setRoomsIdArray] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useSelector(userSelectors);
  const scrollDown = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState<IMessage>();
  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (userId) updateRoomByUrlParam(userId);
  }, [roomsArray]);
  
  useEffect(() => {
    getOldRoomMessages(roomId)
  }, [roomId]);

  const getOldRoomMessages = async (roomId:( string | null)) => {
    if(roomId){
      const {data: { data: roomMessages }}  = await network.get(
        `message/messages/${roomId}`
      );
      setMessages(roomMessages)      
    }
  }
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

  const updateRoomByUrlParam = (userId: string) => {
    roomsArray.forEach((room) => {
      if (room._id) {
        const userIdInRoom = room.participants.userInfo.id;
        if (userIdInRoom === userId) {
          setRoomId(room._id);
        }
      }
    });
  };

  useEffect(() => {
    socket.emit("join-chat", roomsIdArray);
  }, [roomsIdArray]);

  useEffect(() => {
    if (newMessage) {
      let msgArr = messages;
      msgArr.push(newMessage);
      setMessages([...msgArr]);
    }
  }, [newMessage]);

  useEffect((): any => {
    socket.on("message", (message) => {
      setNewMessage(message);
    });
    return (): any => socket.emit("disconnect");
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    const msgObj: IMessage = {
      text: msg,
      chatRoomId: roomId ? roomId : "",
      senderId: user.id,
      createdAt: new Date().getTime(),
    };
    if (msg) {
      socket.emit("send-msg", msgObj);
      let msgArr = messages;
      msgArr.push(msgObj);
      setMessages([...msgArr]);
    }
    scrollDown.current?.scrollIntoView({ behavior: "smooth" });
    setMsg("");
  };

  return (
    <div className="Chat-container">
      <div className="chat-messages-container">
        {selectedRoom !== "" && (
          <>
            {messages.map((message, i) => (
              <Message key={i} message={message} roomId={roomId} />
            ))}
          </>
        )}
        <div className="msg-div">
          <div ref={scrollDown}></div>
          {selectedRoom && (
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
                disabled={msg === "" ? true : false}
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="Chat-rooms-container">
        {roomsArray.map((room: IChatRoom, i) => {
          return (
            <ChatRoom
              setRoomId={setRoomId}
              setSelectedRoom={setSelectedRoom}
              key={i}
              room={room}
              roomId={roomId}
            />
          );
        })}
      </div>
    </div>
  );
}

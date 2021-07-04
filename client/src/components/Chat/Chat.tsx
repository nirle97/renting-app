import "./chat.css";
import { useEffect, useRef, useState } from "react";
import ChatRoom from "./ChatRoom";
import { userSelectors } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import network from "../../utils/network";
import { IChatRoom, IMessage } from "../../interfaces/interface";
import io, { Socket } from "socket.io-client";
import Message from "./Message";
import { useLocation } from "react-router";
import { chatSelectors, setChatRoom } from "../../store/chatSlice";
const ENDPOINT = "localhost:5000";
const socket = io(ENDPOINT, {
  transports: ["websocket"],
});
export default function Chat() {
  const search = useLocation().search;
  const userId = new URLSearchParams(search).get("user");
  const { currentChatRoom } = useSelector(chatSelectors);
  const dispatch = useDispatch();
  const [roomsArray, setRoomsArray] = useState<IChatRoom[]>([]);
  const [roomsIdArray, setRoomsIdArray] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useSelector(userSelectors);
  const scrollDown = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    getRooms();
    selectUserRoomFromChat();
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

  const selectUserRoomFromChat = () => {
    roomsArray.forEach((room) => {
      const userIdInRoom = room.participants.userInfo.id;
      if (userIdInRoom === userId && room._id) {
        dispatch(setChatRoom({ currentChatRoom: room._id }));
      }
    });
  };

  useEffect(() => {
    // socketRef.current = io(ENDPOINT, {
    //   transports: ["websocket"],
    // });
    socket.emit("join-chat", roomsIdArray);
    // socketRef.current?.emit("join-chat", roomsIdArray);
  }, [roomsIdArray]);

  useEffect((): any => {
    socket.on("message", (message) => {
      // console.log(message);

      let msgArr = messages;
      msgArr.push(message);
      setMessages([...msgArr]);
    });
    // socketRef.current?.on("message", (message) => {
    //   let msgArr = messages;
    //   msgArr.push(message);
    //   setMessages([...msgArr]);
    // });
    return (): any => socket.emit("disconnect");
  }, []);

  const sendMessage = (e: any) => {
    // console.log(messages);

    e.preventDefault();
    const msgObj: IMessage = {
      text: msg,
      chatRoomId: currentChatRoom,
      senderId: user.id,
      createdAt: new Date().getTime(),
    };
    if (msg) {
      socket.emit("send-msg", msgObj);
      let msgArr = messages;
      msgArr.push(msgObj);
      setMessages([...msgArr]);
    }
    // socketRef.current?.emit("send-msg", msgObj);

    scrollDown.current?.scrollIntoView({ behavior: "smooth" });
    setMsg("");
  };

  return (
    <div className="Chat-container">
      <div className="chat-messages-container">
        {(currentChatRoom !== ""  ) && (
          <>
            {messages.map((message, i) => (
              <Message key={i} message={message} />
            ))}
          </>
        )}
        <div className="msg-div">
          <div ref={scrollDown}></div>
          {currentChatRoom && (
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
          )}
        </div>
      </div>
      <div className="Chat-rooms-container">
        {roomsArray.map((room: IChatRoom, i) => {
          return <ChatRoom key={i} room={room} />;
        })}
      </div>
    </div>
  );
}

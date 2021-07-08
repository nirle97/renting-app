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
import FileChat from "./FileChat";
import axios from "axios";
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
  const [selectedfile, setSelectedfile] = useState<File | null>(null);
  const msgPath = useRef<any>();
  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (userId) updateRoomByUrlParam(userId);
  }, [roomsArray]);

  useEffect(() => {
    getOldRoomMessages(roomId).then(() => scrollDown.current?.scrollIntoView());
  }, [roomId]);

  const getOldRoomMessages = async (roomId: string | null) => {
    if (roomId) {
      const {
        data: { data: roomMessages },
      } = await network.get(
        `${process.env.REACT_APP_BASE_URL}/message/messages/${roomId}`
      );
      setMessages(roomMessages);
    }
  };
  const getRooms = async () => {
    const { data: rooms } = await network.get(
      `${process.env.REACT_APP_BASE_URL}/chat-room/get-rooms`
    );
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
    return (): any => socket.emit("disconnection");
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

  async function sendFile(
    file: string | Blob,
    description: string,
    e: any
  ): Promise<void> {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("text", selectedfile ? selectedfile.name : "");
    formData.append("chatRoomId", roomId ? roomId : "");
    formData.append("senderId", user.id);
    formData.append("createdAt", new Date().getTime().toString());
    const result = await network.post(
      `${process.env.REACT_APP_BASE_URL}/message/send-file`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    const msgObj: IMessage = {
      text: selectedfile ? selectedfile.name : "",
      chatRoomId: roomId ? roomId : "",
      senderId: user.id,
      createdAt: new Date().getTime(),
      path: result.data.data.path,
    };
    socket.emit("send-msg", msgObj);
    let msgArr = messages;
    msgArr.push(msgObj);
    setMessages([...msgArr]);
    scrollDown.current?.scrollIntoView({ behavior: "smooth" });
    setSelectedfile(null);
  }
  return (
    <div className="Chat-container">
      <div
        className="chat-messages-container"
        style={{ backgroundImage: "url(/images/chat-background.jpeg)" }}
      >
        {selectedRoom !== "" && (
          <div className="Chat-msg-div">
            {messages.map((message, i) => (
              <>
                <Message
                  key={`message-${i}`}
                  message={message}
                  roomId={roomId}
                />
                {i === messages.length - 1 && <div ref={scrollDown}></div>}
              </>
            ))}
          </div>
        )}
        <div>
          {selectedRoom && (
            <form className="Chat-form">
              <span className="Chat-input-wrapper">
                <input
                  className="Chat-input"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "enter" ? sendMessage(e) : null
                  }
                  placeholder={
                    selectedfile ? selectedfile?.name : "Type a message..."
                  }
                />
                <FileChat
                  selectedfile={selectedfile}
                  setSelectedfile={setSelectedfile}
                />
                <button
                  type="submit"
                  className="send-btn"
                  onClick={(e) =>
                    selectedfile
                      ? sendFile(selectedfile, selectedfile.name, e)
                      : sendMessage(e)
                  }
                  disabled={msg === "" && !selectedfile ? true : false}
                >
                  Send
                </button>
              </span>
            </form>
          )}
        </div>
      </div>
      <div className="Chat-rooms-container">
        {roomsArray.map((room: IChatRoom, i) => {
          return (
            <ChatRoom
              key={`chatRoom-${i}`}
              setRoomId={setRoomId}
              setSelectedRoom={setSelectedRoom}
              room={room}
              setRoomsArray={setRoomsArray}
              roomId={roomId}
            />
          );
        })}
      </div>
    </div>
  );
}

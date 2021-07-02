import React from "react";
import ChatRoom from "./ChatRoom";
import MsgScreen from "./MsgScreen";
import "./chat.css";
export default function Chat() {
  return (
    <div className="Chat-container">
      <div className="chat-messages-container">
        <MsgScreen />
      </div>
      <div className="Chat-rooms-container">
        <ChatRoom />
      </div>
    </div>
  );
}

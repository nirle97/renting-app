import React from "react";
import ChatRoom from "./ChatRoom";
import Message from "./Message";
import "./chat.css"
export default function Chat() {
  return (
    <div className="Chat-container">
      <div className="chat-messages-container">
        <Message />
      </div>
      <div className="Chat-rooms-container">
        <ChatRoom />
      </div>
    </div>
  );
}

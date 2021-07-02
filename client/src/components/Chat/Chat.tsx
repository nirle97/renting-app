import React from "react";
import ChatRoom from "./ChatRoom";
import Message from "./Message";
export default function Chat() {
  return (
    <div>
      <div className="Chat-rooms-container">
        <ChatRoom />
      </div>
      <div className="Chat-chat-messages">
        <Message />
      </div>
    </div>
  );
}

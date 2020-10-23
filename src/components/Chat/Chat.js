import React from "react";
import "./Chat.css";
import Base from "../Base/Base";
import ChatSidebar from "../ChatSidebar/ChatSidebar";
import TelegramIcon from "@material-ui/icons/Telegram";

function Chat() {
  return (
    <Base>
      <div className="chat">
        <div className="chat__body">
          <ChatSidebar />
          <div className="chat__right">
            <TelegramIcon className="chat__icon" />
            <h3>Your Messages</h3>
            <p>Send Private messages to a friend</p>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Chat;

import React from "react";
import "./Message.css";
import { isAuthenticated } from "../../api/auth";
function Message({ message }) {
  const { user } = isAuthenticated();
  return (
    <div className="message">
      <p
        className={`message__body ${
          user.username === message.user && "message__body--sender"
        }`}
      >
        <span className="message__name">{message.user}</span>
        {message.content}
        <span className="message__timestamp">
          {new Date(message.createdAt).toDateString()}
        </span>
      </p>
    </div>
  );
}

export default Message;

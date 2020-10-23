import React, { useState, useEffect } from "react";
import "./ChatScreen.css";
import profilePhoto from "../../images/user.png";
import { Avatar, IconButton } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import { useParams, Link } from "react-router-dom";
import { SOCKET_API } from "../../api/backend/backend";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";

let socket;
function ChatScreen() {
  // all chatSession is to map messages from db to each sender and receiver
  const { sendId, receiveId } = useParams();
  const chatSession1 = sendId + receiveId;
  const chatSession2 = receiveId + sendId;
  const chatSession = {
    chatSession1: chatSession1,
    chatSession2: chatSession2,
  };

  // state to store  messages
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  // get all previous chat
  useEffect(() => {
    socket = io(SOCKET_API);
    socket.emit("join", chatSession);
    socket.on("output", (prevMessages) => {
      setMessages(prevMessages.reverse());
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const messageInput = {
      content: input,
      user: sendId,
      chatSession: sendId + receiveId,
    };
    socket.emit("message", messageInput);
    socket.on("push", (newMessage) => {
      setMessages((message) => [...messages, newMessage]);
      setInput("");
    });
  };

  // <button onClick={onSubmit}>SEND</button>
  return (
    <div className="chatScreen">
      <div className="chatScreen__container">
        <div className="chatScreen__header">
          <div className="chatScreen__headerLeft">
            <Link to="/messages">
              <IconButton>
                <KeyboardBackspaceIcon />
              </IconButton>
            </Link>
            <Avatar src={profilePhoto} className="chatScreen__avatar" />
            <h3>{receiveId}</h3>
          </div>
          <InfoOutlinedIcon />
        </div>
        <ScrollToBottom className="chatScreen__scroll">
          <div className="chatScreen__body">
            {messages.map((message) => (
              <Message message={message} key={message._id} />
            ))}
          </div>
        </ScrollToBottom>
        <div className="chatScreen__footer">
          <form>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
            />
            <button type="submit" disabled={!input} onClick={sendMessage}>
              Send a message
            </button>
          </form>
          <div className="chatScreen__formIcons">
            <FavoriteBorderOutlinedIcon
              className="chatScreen__formIcon"
              onClick={() => setInput(input + "❤")}
            />
            <PhotoLibraryOutlinedIcon className="chatScreen__formIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;

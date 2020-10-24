import React, { useState, useEffect } from "react";
import "./ChatScreen.css";
import profilePhoto from "../../images/user.png";
import { Avatar, IconButton } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import { useParams, Link } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";
import { newMessage, getAllmessages } from "../../api/message/messageApiCalls";
import Pusher from "pusher-js";

function ChatScreen() {
  // all chatSession is to map messages from db to each sender and receiver
  const { sendId, receiveId } = useParams();
  const chatSession1 = sendId + receiveId;
  const chatSession2 = receiveId + sendId;

  // state to store  messages
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    const messageInput = {
      content: input,
      user: sendId,
      chatSession: sendId + receiveId,
    };
    newMessage(messageInput)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setInput("");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("ERROR WHILE SENDING MESSAGE");
      });
  };

  // get all previous chat
  useEffect(() => {
    getAllmessages(sendId, receiveId)
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => alert("ERROR WHILE GETTING MESSAGES"));
    return () => {};
  }, [sendId, receiveId]);

  // realtime sync of messages
  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_ID, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe(chatSession1);
    channel.bind(
      "newMessage",
      (newMessages) => setMessages([...messages, newMessages]) //adding new messages to messages
    );

    const channel2 = pusher.subscribe(chatSession2);
    channel2.bind(
      "newMessage",
      (newMessages) => setMessages([...messages, newMessages]) //adding new messages to messages
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      channel2.unbind_all();
      channel2.unsubscribe();
    };
  }, [messages, chatSession1, chatSession2]);

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
            {messages &&
              messages.map((message) => (
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

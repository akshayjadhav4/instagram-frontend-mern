import React, { useState, useEffect } from "react";
import "./ChatSidebar.css";
import profilePhoto from "../../images/user.png";
import CreateIcon from "@material-ui/icons/Create";
import { isAuthenticated } from "../../api/auth";
import { getList } from "../../api/user/userApiCalls";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
function ChatSidebar() {
  const { user, token } = isAuthenticated();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   get list of followingList to send messages
  useEffect(() => {
    const getUserList = () => {
      setIsLoading(true);
      getList(user._id, "followingList", token)
        .then((data) => {
          if (data.error) {
            alert(data.error);
            setIsLoading(false);
          } else {
            setList(data[0].following);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert("ERROR WHILE GETTING LIST");
        });
    };
    getUserList();
  }, [user._id, token]);

  return (
    <div className="chatSidebar">
      <div className="chatSidebar__header">
        <h3>Direct</h3>
        <CreateIcon className="chatSidebar__icon" />
      </div>
      {isLoading ? (
        <h5 className="chatSidebar__infoText">Loading...</h5>
      ) : (
        <div className="chatSidebar__userList">
          {list.length > 0 ? (
            list.map((following) => (
              <Link
                to={`/message/${user.username}/${following.username}`}
                className="chatSidebar__link"
                key={following._id}
              >
                <div className="chatSidebar__item">
                  <Avatar className="chatSidebar__avatar" src={profilePhoto} />
                  <h4>{following.fullname}</h4>
                </div>
              </Link>
            ))
          ) : (
            <h5 className="chatSidebar__infoText">
              You are not following anyone.
            </h5>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatSidebar;

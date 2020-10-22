import React, { useState, useEffect } from "react";
import "./UserList.css";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  IconButton,
  Avatar,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import profilePhoto from "../../images/user.png";
import { useParams, Link } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";
import { getList, unFollowUser } from "../../api/user/userApiCalls";

function UserList() {
  const { listName } = useParams();
  const { user, token } = isAuthenticated();
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const unfollow = (id) => {
    unFollowUser(user._id, token, id)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setReload(!reload);
        }
      })
      .catch((error) => setError("ERROR WHILE UNFOLLOWING"));
  };

  useEffect(() => {
    const getUserList = () => {
      setIsLoading(true);
      getList(user._id, listName, token)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setIsLoading(false);
          } else {
            if (listName === "followingList") {
              setList(data[0].following);
            } else {
              setList(data[0].followers);
            }
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError("ERROR WHILE GETTING LIST");
        });
    };
    getUserList();
  }, [user._id, listName, token, reload]);

  console.log(list);
  return (
    <div className="userList">
      <div className="userList__header">
        <Link to="/profile">
          <IconButton>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Link>
        <h2>{listName.toUpperCase()}</h2>
      </div>
      {error && (
        <div className="userList__alert">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      <div className="userList__listContainer">
        {isLoading ? (
          <>
            <CircularProgress style={{ color: "lightgray" }} />
          </>
        ) : (
          <div className="userList__list">
            {list.length > 0 ? (
              list.map((item) => (
                <div className="userList__listItem">
                  <div className="userList__left">
                    <Avatar src={profilePhoto} className="userList__avatar" />
                    <div className="userList__content">
                      <h3>{item.username}</h3>
                      <h5>{item.fullname}</h5>
                    </div>
                  </div>
                  {listName === "followingList" && (
                    <Button
                      variant="contained"
                      onClick={() => {
                        unfollow(item._id);
                      }}
                    >
                      UNFOLLOW
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <h1>Nothing to show...</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;

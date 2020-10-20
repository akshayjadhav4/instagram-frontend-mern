import React, { useState, useEffect } from "react";
import "./Profile.css";
import Base from "../Base/Base";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import GridOnSharpIcon from "@material-ui/icons/GridOnSharp";
import LiveTvSharpIcon from "@material-ui/icons/LiveTvSharp";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { isAuthenticated } from "../../api/auth";
import { getUserInfo } from "../../api/user/userApiCalls";
function Profile() {
  const [info, setInfo] = useState("");
  // const [posts, setposts] = useState([]);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  // gettinguser info like followers,posts,following
  useEffect(() => {
    const LoadInfo = () => {
      getUserInfo(token, user._id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setInfo(data);
          }
        })
        .catch((error) => setError("ERROR WHILE GETTING USER INFO."));
    };
    LoadInfo();
  }, [token, user._id]);

  return (
    <Base>
      <div className="profile">
        <div className="profile__container">
          <ProfileHeader
            username={info?.username}
            posts={info.userPosts?.length}
            followers={info.followers?.length}
            following={info.following?.length}
            name={info?.fullname}
            bio={info?.bio}
          />
          <hr className="profile__divider" />
          <div className="profile__menu">
            <Button
              startIcon={<GridOnSharpIcon />}
              variant="text"
              className="profile__menu--active"
            >
              POSTS
            </Button>
            <Button startIcon={<LiveTvSharpIcon />} variant="text">
              IGTV
            </Button>
            <Button startIcon={<TurnedInNotIcon />} variant="text">
              SAVED
            </Button>
            <Button startIcon={<AccountBoxOutlinedIcon />} variant="text">
              TAGGED
            </Button>
          </div>
          <hr className="profile__divider" />
          {error && (
            <div className="signIn__alert">
              <Alert severity="error">{error}</Alert>
            </div>
          )}
          <div className="profile__postsGrid"></div>
        </div>
      </div>
    </Base>
  );
}

export default Profile;

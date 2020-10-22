import React, { useState } from "react";
import "./ProfileHeader.css";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import SettingsSharpIcon from "@material-ui/icons/SettingsSharp";
import profilePhoto from "../../images/user.png";
import { Link, useHistory } from "react-router-dom";
import { signout } from "../../api/auth/index";

function ProfileHeader({ username, posts, followers, following, name, bio }) {
  const history = useHistory();

  const [menuState, setMenuState] = useState(null);

  //   for dropdown menu
  const handleClick = (event) => {
    setMenuState(event.currentTarget);
  };

  //   for dropdown menu
  const handleClose = () => {
    setMenuState(null);
  };

  //   signout
  const signOut = () => {
    signout(() => {
      history.push("/signin");
    });
  };

  return (
    <div className="profileHeader">
      <div className="profileHeader__photo">
        <Avatar src={profilePhoto} className="profileHeader__avtar" />
      </div>
      <div className="profileHeader__info">
        <div className="profileHeader__userControls">
          <h1 className="profileHeader__userName">{username}</h1>
          <Link to="/user/editProfile" className="profileHeader__link">
            <Button variant="outlined" className="profileHeader__editButton">
              Edit Profile
            </Button>
          </Link>
          <>
            <IconButton onClick={handleClick}>
              <SettingsSharpIcon />
            </IconButton>
            <Menu
              anchorEl={menuState}
              keepMounted
              open={Boolean(menuState)}
              onClose={handleClose}
            >
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
          </>
        </div>
        <div className="profileHeader__userStats">
          <Link className="profileHeader__link">
            <strong>{posts} </strong> posts
          </Link>
          <Link to="/user/followersList" className="profileHeader__link">
            <strong>{followers}</strong> followers
          </Link>
          <Link to="/user/followingList" className="profileHeader__link">
            <strong>{following}</strong> following
          </Link>
        </div>
        <div className="profileHeader__name">
          <h1>{name}</h1>
        </div>
        <div className="profileHeader__bio">
          <p>{bio}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

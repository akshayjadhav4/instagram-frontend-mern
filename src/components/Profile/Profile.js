import React from "react";
import "./Profile.css";
import Base from "../Base/Base";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import GridOnSharpIcon from "@material-ui/icons/GridOnSharp";
import LiveTvSharpIcon from "@material-ui/icons/LiveTvSharp";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import { Button } from "@material-ui/core";
function Profile() {
  return (
    <Base>
      <div className="profile">
        <div className="profile__container">
          <ProfileHeader
            username="akshayjadhav"
            posts="31"
            followers="155"
            following="142"
            name="AKSHAY JADHAV"
            bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            tristique ipsum odio, quis semper nisl semper quis. Phasellus in
            erat sed diam cursus imperdiet. Nam dictum fringilla lacus quis
            malesuada."
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
        </div>
      </div>
    </Base>
  );
}

export default Profile;

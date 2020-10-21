import React from "react";
import "./FollowSuggestion.css";
import { Avatar, Button } from "@material-ui/core";
import profilePhoto from "../../images/user.png";

function FollowSuggestion({ username }) {
  return (
    <div className="followSuggestion">
      <div className="followSuggestion__left">
        <Avatar src={profilePhoto} className="followSuggestion__avtar" />
        <h3>{username}</h3>
      </div>
      <Button variant="text">Follow</Button>
    </div>
  );
}

export default FollowSuggestion;

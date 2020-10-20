import React from "react";
import "./Profile.css";
import Base from "../Base/Base";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
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
        </div>
      </div>
    </Base>
  );
}

export default Profile;

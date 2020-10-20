import React from "react";
import { API } from "../../api/backend/backend";

function ImageHelper({ post }) {
  const imageUrl = post
    ? `${API}/post/photo/${post._id}`
    : "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  return (
    <img
      src={imageUrl}
      style={{ width: "100%", objectFit: "contain" }}
      alt="gridImage"
    />
  );
}

export default ImageHelper;

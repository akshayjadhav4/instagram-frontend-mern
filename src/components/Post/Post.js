import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import profilePhoto from "../../images/user.png";
import ImageHelper from "../PostGrid/ImageHelper";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { isAuthenticated } from "../../api/auth";
function Post({ post, like, unlike }) {
  const { user } = isAuthenticated();
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" src={profilePhoto} />
        <div className="post__headerContent">
          <h3>{post.author.username}</h3>
          <p>{post.location}</p>
        </div>
      </div>
      <div
        className="post__image"
        onDoubleClick={() => {
          post.likes.includes(user._id) ? unlike(post._id) : like(post._id);
        }}
      >
        <ImageHelper post={post} className="post__image" />
      </div>
      <div className="post__controls">
        <div className="post__controlsLeft">
          <div className="post__leftTop">
            {post.likes.includes(user._id) ? (
              <FavoriteOutlinedIcon
                className="post__icon post__icon--active"
                onClick={() => {
                  post.likes.includes(user._id)
                    ? unlike(post._id)
                    : like(post._id);
                }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                className="post__icon"
                onClick={() => {
                  post.likes.includes(user._id)
                    ? unlike(post._id)
                    : like(post._id);
                }}
              />
            )}

            <ModeCommentOutlinedIcon className="post__icon" />
          </div>
          <h5>{post.likes.length} Likes</h5>
        </div>
        <BookmarkBorderOutlinedIcon className="post__icon" />
      </div>

      <h4 className="post__text">
        <strong>{post.author.username} </strong>
        {post.description}
      </h4>
      <p className="post__textTwo">{post.comments.length} comments</p>
    </div>
  );
}

export default Post;

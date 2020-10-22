import React from "react";
import "./ViewPost.css";
import profilePhoto from "../../images/user.png";
import { Avatar, Card } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import CommentBox from "../CommentBox/CommentBox";
import { API } from "../../api/backend/backend";
import { likePost, unlikePost } from "../../api/posts/postsApiCalls";
import { isAuthenticated } from "../../api/auth";

function ViewPost({ post, handleClose }) {
  const { user, token } = isAuthenticated();

  const imageUrl = post
    ? `${API}/post/photo/${post._id}`
    : "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  // like post
  const like = (postId) => {
    likePost(postId, user._id, token)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Post liked");
          window.location.reload(true);
        }
      })
      .catch((error) => alert("ERROR WHILE LIKEING POST"));
  };

  // unlike post
  const unlike = (postId) => {
    unlikePost(postId, user._id, token)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Post Unliked");
          window.location.reload(true);
        }
      })
      .catch((error) => alert("ERROR WHILE LIKEING POST"));
  };

  return (
    <div className="viewPost">
      <Card className="viewPost__card">
        {/* post Image */}
        <img
          src={imageUrl}
          alt=""
          className="viewPost__image"
          onDoubleClick={() => {
            post.likes.includes(user._id) ? unlike(post._id) : like(post._id);
          }}
        />
        {/* post info */}
        <div className="viewPost__info">
          {/* header */}
          <div className="viewPost__header">
            <Avatar className="viewPost__avatar" src={profilePhoto} />
            <div className="viewPost__headerContent">
              <h3>{post.author.fullname}</h3>
              <p>{post.location}</p>
            </div>
          </div>
          {/* caption */}
          <h4 className="viewPost__text">
            <strong>{post.author.fullname} </strong>
            {post.description}
          </h4>
          {/* comments */}
          <div className="viewPost__comments">
            {post.comments.map((comment) => (
              <div className="viewPost__comment">
                <p key={comment._id}>
                  <strong>{comment.postedBy} </strong>
                  {comment.comment}
                </p>
                <p className="viewPost__commentDate">
                  {new Date(comment.createdAt).toDateString()}
                </p>
              </div>
            ))}
          </div>
          {/* controls ->> like, dislike */}
          <div className="viewPost__controls">
            <div className="viewPost__controlsLeft">
              <div className="viewPost__leftTop">
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
                <ModeCommentOutlinedIcon className="viewPost__icon" />
              </div>
              <h5>{post.likes.length} Likes</h5>
            </div>
            <BookmarkBorderOutlinedIcon className="viewPost__icon" />
          </div>
          {/* posted date */}
          <p className="viewPost__date">
            {new Date(post.createdAt).toDateString()}
          </p>
          {/* comment box */}
          <CommentBox postId={post._id} viewPost />
        </div>
      </Card>
    </div>
  );
}

export default ViewPost;

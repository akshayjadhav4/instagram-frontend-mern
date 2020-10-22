import React, { useState } from "react";
import "./CommentBox.css";
import { Button } from "@material-ui/core";
import { isAuthenticated } from "../../api/auth";
import { addComment } from "../../api/posts/postsApiCalls";
function CommentBox({ postId, reload, setReload, viewPost }) {
  const [comment, setComment] = useState("");
  const { user, token } = isAuthenticated();

  const postComment = () => {
    const commentData = {
      comment: comment,
      post: postId,
      postedBy: user.username,
    };
    addComment(postId, user._id, token, commentData)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          if (viewPost) {
            window.location.reload(true);
          } else {
            setReload(!reload);
          }
        }
      })
      .catch((error) => alert("ERROR WHILE POSTING COMMENT"));
  };

  return (
    <div className="commentBox">
      <form className="commentBox__form">
        <input
          type="text"
          className="commentBox__input"
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          variant="text"
          className="commentBox__button"
          disabled={!comment}
          onClick={postComment}
        >
          POST
        </Button>
      </form>
    </div>
  );
}

export default CommentBox;

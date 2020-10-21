import React, { useState, useEffect } from "react";
import "./Home.css";
import Base from "../Base/Base";
import Post from "../Post/Post";
import { Avatar, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import profilePhoto from "../../images/user.png";
import FollowSuggestion from "../FollowSuggestion/FollowSuggestion";
import { isAuthenticated } from "../../api/auth";
import { getAllUsers, followUser } from "../../api/user/userApiCalls";
import {
  getAllPostsOfFollowing,
  likePost,
  unlikePost,
} from "../../api/posts/postsApiCalls";

function Home() {
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [success, setSuccess] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // using reload as dependancy to get new suggestion list
  const [reload, setReload] = useState(false);

  const { user, token } = isAuthenticated();
  const follow = (followId) => {
    followUser(user._id, token, followId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(`You started following.`);
          setReload(!reload);
        }
      })
      .catch((error) => setError("ERROR WHILE SENDING FOLLOW REQUEST."));
  };

  // like post
  const like = (postId) => {
    likePost(postId, user._id, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          //reset state to rerender data
          const postData = allPosts.map((item) => {
            if (item._id === data._id) {
              return data;
            } else {
              return item;
            }
          });
          setAllPosts(postData);
        }
      })
      .catch((error) => setError("ERROR WHILE LIKEING POST"));
  };

  // unlike post
  const unlike = (postId) => {
    unlikePost(postId, user._id, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          //reset state to rerender data
          const postData = allPosts.map((item) => {
            if (item._id === data._id) {
              return data;
            } else {
              return item;
            }
          });
          setAllPosts(postData);
        }
      })
      .catch((error) => setError("ERROR WHILE LIKEING POST"));
  };

  // loading user list for follow suggestions
  useEffect(() => {
    const getAllSuggestions = () => {
      getAllUsers(user._id, token)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSuggestions(data);
          }
        })
        .catch((error) => setError("ERROR WHILE GETTING SUGGESTION LIST."));
    };
    getAllSuggestions();
  }, [user._id, token, reload]);

  // getting post to show on feed
  useEffect(() => {
    const getAllPostsForFollowing = () => {
      setisLoading(true);
      getAllPostsOfFollowing(user._id, token)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setisLoading(false);
          } else {
            setAllPosts(data);
            setisLoading(false);
          }
        })
        .catch((error) => {
          setisLoading(false);
          setError("ERROR WHILE GETTING FEED POSTS.");
        });
    };
    getAllPostsForFollowing();
  }, [user._id, token, reload]);
  return (
    <Base>
      <div className="home">
        {error && (
          <div className="home__alert">
            <Alert severity="error">{error}</Alert>
          </div>
        )}
        <div className="home__container">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <div className="home__posts">
                {allPosts.map((post) => (
                  <Post
                    key={post._id}
                    post={post}
                    like={like}
                    unlike={unlike}
                    reload={reload}
                    setReload={setReload}
                  />
                ))}
              </div>
              <div className="home__suggesions">
                <div className="home__suggesionHeader">
                  <Avatar className="home__avatar" src={profilePhoto} />
                  <div className="home__headerText">
                    <h3>{user.username}</h3>
                    <h4>{user.fullname}</h4>
                  </div>
                </div>
                {suggestions?.length > 0 && (
                  <>
                    <h4 className="home__suggesionText">Suggestions For You</h4>
                    {success && (
                      <div className="home__alert">
                        <Alert severity="success">{success}</Alert>
                      </div>
                    )}
                    <div className="home__suggesionContainer">
                      {suggestions.map((suggestion) => (
                        <FollowSuggestion
                          key={suggestion._id}
                          username={suggestion.username}
                          follow={follow}
                          followId={suggestion._id}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Base>
  );
}

export default Home;

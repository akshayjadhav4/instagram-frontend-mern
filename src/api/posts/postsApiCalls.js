import { API } from "../backend/backend";

// get all user posts to show on profile
export const getAllUserPosts = (userId, token) => {
  return fetch(`${API}/user/posts/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// add post
export const createPost = (userId, token, post) => {
  return fetch(`${API}/post/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// to show on user feed
export const getAllPostsOfFollowing = (userId, token) => {
  return fetch(`${API}/user/getAllPostsOfFollowing/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const likePost = (postId, userId, token) => {
  return fetch(`${API}/post/like/${postId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postId: postId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const unlikePost = (postId, userId, token) => {
  return fetch(`${API}/post/unlike/${postId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postId: postId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

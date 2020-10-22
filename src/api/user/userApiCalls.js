import { API } from "../backend/backend";

export const getUserInfo = (token, userId) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUser = (userId, token, user) => {
  return fetch(`${API}/user/updateProfile/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllUsers = (userId, token) => {
  return fetch(`${API}/user/getAllUsers/${userId}`, {
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

export const followUser = (userId, token, followingId) => {
  return fetch(`${API}/user/follow/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ followingId: followingId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getList = (userId, option, token) => {
  return fetch(`${API}user/${option}/${userId}`, {
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

export const unFollowUser = (userId, token, unFollowingId) => {
  return fetch(`${API}/user/unfollow/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ unFollowingId: unFollowingId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

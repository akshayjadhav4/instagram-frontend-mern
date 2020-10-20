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

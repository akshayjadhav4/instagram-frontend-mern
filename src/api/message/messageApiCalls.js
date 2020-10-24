import { API } from "../backend/backend";

export const newMessage = (message) => {
  return fetch(`${API}/message/new`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getAllmessages = (sendId, receiveId) => {
  return fetch(`${API}/message/sync/${sendId}/${receiveId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

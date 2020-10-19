import React from "react";
import { isAuthenticated } from "../../api/auth";
import { Redirect } from "react-router-dom";

export const performRedirect = () => {
  if (isAuthenticated()) {
    return <Redirect to="/" />;
  }
};

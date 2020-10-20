import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import PrivateRoutes from "./api/auth/PrivateRoutes";
import Profile from "./components/Profile/Profile";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <PrivateRoutes path="/" exact component={Home} />
          <PrivateRoutes path="/profile" exact component={Profile} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

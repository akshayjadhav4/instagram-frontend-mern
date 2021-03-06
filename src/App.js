import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import PrivateRoutes from "./api/auth/PrivateRoutes";
import Profile from "./components/Profile/Profile";
import AddPost from "./components/AddPost/AddPost";
import EditProfile from "./components/EditProfile/EditProfile";
import Explore from "./components/Explore/Explore";
import UserList from "./components/UserList/UserList";
import Chat from "./components/Chat/Chat";
import ChatScreen from "./components/ChatScreen/ChatScreen";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <PrivateRoutes path="/" exact component={Home} />
          <PrivateRoutes path="/profile" exact component={Profile} />
          <PrivateRoutes path="/addPost" exact component={AddPost} />
          <PrivateRoutes
            path="/user/editProfile"
            exact
            component={EditProfile}
          />
          <PrivateRoutes path="/explore" exact component={Explore} />
          <PrivateRoutes path="/user/:listName" exact component={UserList} />
          <PrivateRoutes path="/messages" exact component={Chat} />
          <PrivateRoutes
            path="/message/:sendId/:receiveId"
            exact
            component={ChatScreen}
          />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

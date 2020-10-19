import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

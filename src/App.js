import React, { useState } from "react";
import { withRouter, Route, Switch } from "react-router";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";

const App = (props) => {
  const initialState = {
    currentUser: {},
    currentView: "posts",
  };

  const [stateObject, setStateObject] = useState(initialState);

  const setUser = (user) => {
    console.log("user", user);
    setStateObject({
      ...stateObject,
      currentUser: user,
    });
    props.history.push("/feed");
  };

  const logOut = () => {
    setStateObject({
      currentUser: "",
      currentView: "posts",
    });
    props.history.push("/login");
  };

  const showFeed = () => {
    setStateObject({
      ...stateObject,
      currentView: "posts",
    });
  };

  const showSafety = () => {
    setStateObject({
      ...stateObject,
      currentView: "safety",
    });
  };

  return (
    <div className="App">
      <Header
        currentUser={stateObject.currentUser}
        logOut={logOut}
        showFeed={showFeed}
        showSafety={showSafety}
      />
      <Switch>
        <Route path="/signup" render={() => <SignUp setUser={setUser} />} />
        <Route path="/login" render={() => <Login setUser={setUser} />} />
        <Route
          path="/feed"
          render={() => (
            <MainContainer
              currentUser={stateObject.currentUser}
              currentView={stateObject.currentView}
            />
          )}
        />
        <Route
          path="/safety_concerns"
          render={() => (
            <MainContainer
              currentUser={stateObject.currentUser}
              currentView={stateObject.currentView}
            />
          )}
        />
        <Route path="/" render={() => <Login setUser={setUser} />} />
      </Switch>
    </div>
  );
};
export default withRouter(App);

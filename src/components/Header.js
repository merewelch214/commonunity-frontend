import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const { currentUser, showFeed, showSafety, logOut } = props;
  const [notifications, setNotifications] = useState("");
  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:3000/unresolved_safety_concerns")
        .then((resp) => resp.json())
        .then((numConcerns) => setNotifications(numConcerns));
    }
    fetchData();
  }, []);

  return (
    <div className="header">
      <h1> CommonUnity </h1>
      <ul className="manager-buttons">
        <li>
          {currentUser.is_manager && (
            <NavLink to="/feed" exact onClick={showFeed}>
              Announcements
            </NavLink>
          )}
        </li>
        <li>
          {currentUser.is_manager && (
            <NavLink to="/safety_concerns" exact onClick={showSafety}>
              Safety Concerns{" "}
              {notifications > 0 ? "(" + notifications + ")" : null}
            </NavLink>
          )}
        </li>
        <li>
          {currentUser && (
            <NavLink to="/" exact onClick={logOut}>
              Log Out
            </NavLink>
          )}
        </li>
        {currentUser && currentUser.name && (
          <li id="user-initial">{currentUser.name[0]}</li>
        )}
      </ul>
    </div>
  );
};

export default Header;

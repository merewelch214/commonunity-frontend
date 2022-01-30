import React from "react";
import CheckInContainer from "./CheckInContainer";
import LocationFeed from "./LocationFeed";

const CommandCenter = (props) => {
  const { currentUser } = props;
  return (
    <div className="CommandCenter">
      {!currentUser.is_manager && (
        <CheckInContainer currentUser={currentUser} />
      )}
      <LocationFeed />
    </div>
  );
};

export default CommandCenter;

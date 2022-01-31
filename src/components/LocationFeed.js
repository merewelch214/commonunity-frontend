import React, { useEffect, useState } from "react";
import LocationCard from "./LocationCard";
import { ActionCable } from "actioncable-client-react";

const LocationFeed = () => {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/latest_unique_check_ins`)
      .then((resp) => resp.json())
      .then((check_ins) => setCheckIns({ check_ins }));
  }, []);

  const handleReceived = (data) => {
    const check_in = data.check_in.data.attributes;
    const id = parseInt(data.check_in.data.id);
    const updatedCheckIn = checkIns.find((check_in) => check_in.id === id);
    // if there is already a check in object with this id, do not create a new one, update old
    if (updatedCheckIn) {
      updatedCheckIn.checked_in_at = new Date();
      const copiedState = [...checkIns];
      const findMatch = (check_in) => check_in.id === updatedCheckIn.id;
      const index = checkIns.findIndex(findMatch);
      copiedState.splice(index, 1);
      copiedState.unshift(updatedCheckIn);
      setCheckIns({
        check_ins: copiedState,
      });
    } else {
      // if there is no check in object with this id, create a new one
      const copiedState = [...checkIns];
      const new_check_in = {
        id: id,
        user_id: check_in.user_id,
        location: check_in.location,
        created_at: check_in.created_at,
        checked_in_at: check_in.checked_in_at,
        user: { name: check_in.user.name },
      };
      const updatedState = copiedState.filter(
        (check_in) => check_in.user_id !== new_check_in.user_id
      );
      updatedState.unshift(new_check_in);
      setCheckIns({
        check_ins: updatedState,
      });
    }
  };

  return (
    <div className="location-feed">
      <p>YOUR TEAM</p>
      <ul>
        <ActionCable channel={"TeamChannel"} onReceived={handleReceived} />
        {checkIns.map((check_in) => (
          <LocationCard
            key={check_in.id}
            user={check_in.user.name}
            location={check_in.location}
            check_in_time={check_in.created_at}
            check_out_time={check_in.checked_in_at}
          />
        ))}
      </ul>
    </div>
  );
};

export default LocationFeed;

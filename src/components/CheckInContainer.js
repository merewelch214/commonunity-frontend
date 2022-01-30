import React, { useEffect, useState } from "react";
import CheckInButtons from "./CheckInButtons";
import CheckOutButtons from "./CheckOutButtons";
import SafetyConcernBanner from "./SafetyConcernBanner";
// import APICommunicator from '../services/adapter';

const CheckInContainer = (props) => {
  const { currentUser } = props;

  const [stateObject, setStateObject] = useState({
    location: "",
    lat: "",
    long: "",
  });

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        // adapter.getUserCheckIns(currentUser.id)
        fetch(`http://localhost:3000/users/${currentUser.id}/latest_check_in`)
          .then((resp) => resp.json())
          .then((check_in) =>
            setStateObject({ ...stateObject, location: check_in.location })
          ),
        // adapter.getUserSafetyConcerns(currentUser.id)
        fetch(`http://localhost:3000/users/${currentUser.id}/safety_concerns`)
          .then((resp) => resp.json())
          .then((safety_concern) =>
            setStateObject({
              ...stateObject,
              lat: safety_concern.latitude,
              long: safety_concern.longitude,
            })
          ),
      ]);
    }
    fetchData();
  }, [currentUser.id]);

  const checkIn = async (e) => {
    const location = e.target.name;
    console.log("location", location);
    setStateObject({ ...stateObject, location });
    console.log("state object should have a location", location);
    // const adapter = new APICommunicator();
    // const check_in = {
    //     user_id: currentUser.id,
    //     location: e.target.name,
    //     location_text: this.state.location_text
    // }
    // adapter.createCheckIn(check_in)

    await fetch(`http://localhost:3000/users/${currentUser.id}/check_ins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        location,
      }),
    });
  };

  const checkOut = async () => {
    setStateObject({ ...stateObject, location: "" });

    await fetch(
      `http://localhost:3000/check_ins_by_user_id/${currentUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

  const success = async (pos) => {
    setStateObject({
      ...stateObject,
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    });
    await fetch(`http://localhost:3000/safety_concern`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        latitude: stateObject.lat,
        longitude: stateObject.long,
      }),
    });
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const logSafetyConcern = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <div className="check-in-container">
      <p>Your Location</p>
      <div className="command-buttons">
        {stateObject.location ? (
          <CheckOutButtons
            checkOut={checkOut}
            location={stateObject.location}
            logSafetyConcern={logSafetyConcern}
          />
        ) : (
          <CheckInButtons checkIn={checkIn} />
        )}
        {stateObject.lat && <SafetyConcernBanner />}
      </div>
    </div>
  );
};

export default CheckInContainer;

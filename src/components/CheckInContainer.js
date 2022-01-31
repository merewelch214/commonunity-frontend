import React, { useLayoutEffect, useState } from "react";
import CheckInButtons from "./CheckInButtons";
import CheckOutButtons from "./CheckOutButtons";
import SafetyConcernBanner from "./SafetyConcernBanner";
import { merge } from "lodash";
// import APICommunicator from '../services/adapter';

const CheckInContainer = (props) => {
  const { currentUser } = props;
  const [stateObject, setStateObject] = useState({
    location: "",
    lat: "",
    long: "",
  });

  useLayoutEffect(() => {
    async function fetchData() {
      await Promise.all([
        // adapter.getUserCheckIns(currentUser.id)
        fetch(`http://localhost:3000/users/${currentUser.id}/current_check_in`)
          .then((resp) => resp.json())
          .then((check_in) =>
            setStateObject((prevState) => ({
              ...prevState,
              location: check_in.location || "",
            }))
          ),
        // adapter.getUserSafetyConcerns(currentUser.id)
        fetch(`http://localhost:3000/users/${currentUser.id}/safety_concerns`)
          .then((resp) => resp.json())
          .then((safety_concern) =>
            setStateObject((prevState) => ({
              ...prevState,
              lat: safety_concern.latitude || "",
              long: safety_concern.longitude || "",
            }))
          ),
      ]);
    }
    fetchData();
  }, [currentUser.id]);

  const checkIn = async (e) => {
    const locationName = e.target.name;
    console.log("locationName", locationName);
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
        location: locationName,
      }),
    });

    setStateObject(merge({ ...stateObject }, { location: locationName }));
  };

  const checkOut = async () => {
    await fetch(
      `http://localhost:3000/check_ins_by_user_id/${currentUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          location: stateObject.location,
        }),
      }
    );

    setStateObject((prevState) => ({ ...prevState, location: "" }));
  };

  const success = async (pos) => {
    setStateObject((prevState) => ({
      ...prevState,
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    }));
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
  console.log("location on mount", stateObject.location);

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

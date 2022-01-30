import React from "react";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const LocationFeed = (props) => {
  const { check_out_time, location, check_in_time, user } = props;
  return (
    <div className="location-card">
      <div className="location-icon">
        {check_out_time ? (
          <FontAwesomeIcon icon={faTimesCircle} color="#d69580" />
        ) : (
          <FontAwesomeIcon icon={faCheckCircle} color="#abd680" />
        )}
      </div>
      <div className="location-text">
        <b>{user}</b> checked {check_out_time ? "out of a " : "into a "}{" "}
        <b>{location}</b> <br />
        <span className="time">
          <Moment format="LLL">
            {check_out_time ? check_out_time : check_in_time}
          </Moment>
        </span>
      </div>
    </div>
  );
};

export default LocationFeed;

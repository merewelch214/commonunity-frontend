import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons";

const CheckOutButtons = (props) => {
  const { checkOut, location, logSafetyConcern } = props;
  return (
    <div className="check-safety">
      <button name="" onClick={logSafetyConcern}>
        <FontAwesomeIcon icon={faLifeRing} color="red" />
        Log Safety Concern
      </button>
      <button name="" onClick={checkOut}>
        Checking out of <b> {location} </b>
      </button>
    </div>
  );
};

export default CheckOutButtons;

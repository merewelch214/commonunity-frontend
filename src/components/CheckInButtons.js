import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faHome,
  faLaptop,
  faSearchLocation,
} from "@fortawesome/free-solid-svg-icons";

const CheckInButtons = (props) => {
  const { checkIn } = props;
  return (
    <div className="check-out">
      <button name="Member Visit" onClick={checkIn}>
        <FontAwesomeIcon icon={faHome} color="#EEEEDD" /> <br />
        Member Visit
      </button>
      <button name="Facility" onClick={checkIn}>
        <FontAwesomeIcon icon={faHospital} color="#EEEEDD" />
        <br />
        Facility
      </button>
      <button name="Touchdown Space" onClick={checkIn}>
        <FontAwesomeIcon icon={faLaptop} color="#EEEEDD" />
        <br />
        TD Space
      </button>
      <button name="Other" onClick={checkIn}>
        <FontAwesomeIcon icon={faSearchLocation} color="#EEEEDD" />
        <br />
        Other
      </button>
    </div>
  );
};

export default CheckInButtons;

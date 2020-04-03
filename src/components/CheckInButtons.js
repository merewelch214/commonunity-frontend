import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital,faHome,faLaptop,faSearchLocation } from '@fortawesome/free-solid-svg-icons';

const CheckInButtons = (props) => {
    return (
        <div className='check-out'>
            <button name='Member Visit' onClick={props.checkIn}> 
                <FontAwesomeIcon icon={faHome} color='#EEEEDD' /> <br />
                Member Visit</button>
            <button name='Facility' onClick={props.checkIn}> 
                <FontAwesomeIcon icon={faHospital} color='#EEEEDD' /><br />
                Facility</button>
            <button name='Touchdown Space' onClick={props.checkIn}>
                <FontAwesomeIcon icon={faLaptop} color='#EEEEDD' /><br />
                TD Space</button>
            <button name='Other' onClick={props.checkIn}>
                <FontAwesomeIcon icon={faSearchLocation} color='#EEEEDD' /><br />
                Other</button>
        </div>
    )
}

export default CheckInButtons;
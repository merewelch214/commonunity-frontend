import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLifeRing } from '@fortawesome/free-solid-svg-icons';

const CheckOutButtons = (props) => {
    return (
        <div className='check-safety'>
        <button name='' onClick={props.logSafetyConcern}>
            <FontAwesomeIcon icon={faLifeRing} color='red' />
            Log Safety Concern</button>
        <button name=''
            onClick={props.checkOut}>Checking out of <b> {props.location} </b> 
        </button>
    </div>
    )
}

export default CheckOutButtons;
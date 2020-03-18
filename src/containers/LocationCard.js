import React from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'




function LocationFeed(props) {
    
    return (
       <div className='location-card'>
            <div className='location-text'>
                <b>{props.user}</b> checked {props.check_out_time ? 'out of a ' : 'into a '} 
                <b>{props.location}</b> at <b><Moment format="LLL">{props.check_out_time ? props.check_out_time : props.check_in_time}</Moment></b>.
            </div>
            <div className='location-icon'>
                 <FontAwesomeIcon icon={faSignInAlt} color='grey' />
            </div>
        </div>
    )
}

export default LocationFeed;
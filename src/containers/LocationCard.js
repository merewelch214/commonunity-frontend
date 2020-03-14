import React from 'react';
import Moment from 'react-moment';

function LocationFeed(props) {
    
    return (
       <div className='location-card'>
            <p>
                <b>{props.user}</b> checked {props.check_out_time ? 'out of a ' : 'into a '} 
                <b>{props.location}</b> at <b><Moment format="LLL">{props.check_out_time ? props.check_out_time : props.check_in_time}</Moment></b>.
            </p>
        </div>
    )
}

export default LocationFeed;
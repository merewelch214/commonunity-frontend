import React from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Animate from 'animate.css-react'
import 'animate.css/animate.css'


const LocationFeed = props => {
    return (
        <Animate
            change="flipInX"
            // appear='flipInX'
            durationAppear={1000}
            component="div" >
       <div className='location-card'>
            <div className='location-icon'>
                {props.check_out_time ? <FontAwesomeIcon icon={faTimesCircle} color='#d69580' /> : <FontAwesomeIcon icon={faCheckCircle} color='#abd680' />}
            </div>            
            <div className='location-text'>
                    <b>{props.user}</b> checked {props.check_out_time ? 'out of a ' : 'into a '} 
                <b>{props.location}</b> <br /> 
                <span className='time'><Moment format="LLL">{props.check_out_time ? props.check_out_time : props.check_in_time}</Moment></span>
            </div>
        </div>
        </Animate>
    )
}

export default LocationFeed;
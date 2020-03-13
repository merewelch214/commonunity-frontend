import React from 'react';

function LocationFeed(props) {
    return (
        <div className='location-card'>
            <p>
                <b>{props.user}</b> checked into <b>{props.location}</b> at <b>{props.check_in_time}</b>.
            </p>
        </div>
    )
}

export default LocationFeed;
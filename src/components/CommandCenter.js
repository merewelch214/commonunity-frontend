import React from 'react';
import CheckInContainer from './CheckInContainer';
import LocationFeed from './LocationFeed';

const CommandCenter = (props) => {
return (
    <div className='CommandCenter'>
        {!props.currentUser.is_manager && <CheckInContainer currentUser={props.currentUser} />}
        <LocationFeed />
    </div>
)

}

export default CommandCenter;
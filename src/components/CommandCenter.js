import React from 'react';
import CheckIn from '../containers/CheckIn';
import LocationFeed from '../containers/LocationFeed';

const CommandCenter = (props) => {
return (
    <div className='CommandCenter'>
        {!props.currentUser.is_manager && <CheckIn currentUser={props.currentUser} />}
        <LocationFeed />
    </div>
)

}

export default CommandCenter;
import React from 'react';
import CheckIn from './CheckIn';
import LocationFeed from './LocationFeed';

class CommandCenter extends React.Component {
    render() {
        return (
            <div className='CommandCenter'>
                {/* only show if user is not manager */}
                <CheckIn />
                <LocationFeed />
            </div>
        )
    }
}

export default CommandCenter;
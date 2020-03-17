import React from 'react';
import CheckIn from './CheckIn';
import LocationFeed from './LocationFeed';

class CommandCenter extends React.Component {
    render() {
        return (
            <div className='CommandCenter'>
                {!this.props.currentUser.is_manager && <CheckIn currentUser={this.props.currentUser} />}
                <LocationFeed />
            </div>
        )
    }
}

export default CommandCenter;
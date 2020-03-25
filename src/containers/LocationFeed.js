import React from 'react';
import LocationCard from './LocationCard';
import { ActionCable } from 'actioncable-client-react';
// import FeedDisplay from './FeedDisplay';

class LocationFeed extends React.Component {
    
    state = {
        check_ins: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/check_ins`)
        .then(resp=>resp.json())
        .then(check_ins => this.setState({check_ins}))
    }

    handleReceived = (data) => {
        const check_in_object = data.check_in.data
        const id = parseInt(check_in_object.id)
        const updatedCheckIn = this.state.check_ins.filter(check_in => check_in.id === id)
        console.log('outside if', updatedCheckIn)
        
        // if there is already a check in object with this id, do not create a new one, update old
        if (updatedCheckIn.length > 0) {
            updatedCheckIn[0].checked_in_at = new Date()

            let copiedState = this.state.check_ins
            const findMatch = (check_in) => check_in.id === updatedCheckIn[0].id
            const index = this.state.check_ins.findIndex(findMatch)
            copiedState[index] = updatedCheckIn[0] 
            this.setState({
                check_ins: copiedState 
            })
        } else {
        // if there is not a check in object with this id, create a new one
            const new_check_in = {
                id: parseInt(check_in_object.id), 
                user_id: check_in_object.attributes.user_id,
                location: check_in_object.attributes.location,
                created_at: check_in_object.attributes.created_at,
                checked_in_at: check_in_object.attributes.checked_in_at,
                user: {name: check_in_object.attributes.user.name}}

            this.setState({check_ins: [...this.state.check_ins, new_check_in]})
        
    }}
    
    render() {
        return (
            <div className='location-feed'>
                <p>YOUR TEAM</p>
                <ul>
                    <ActionCable channel={'TeamChannel'} onReceived={this.handleReceived} />
                    {this.state.check_ins.map(check_in => <LocationCard key={check_in.id} user={check_in.user.name} location={check_in.location} check_in_time={check_in.created_at} check_out_time={check_in.checked_in_at}/>)}
                </ul>
            </div>    
        )
    }
}

export default LocationFeed;
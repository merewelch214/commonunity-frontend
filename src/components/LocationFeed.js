import React from 'react';
import LocationCard from './LocationCard';
import { ActionCable } from 'actioncable-client-react';
class LocationFeed extends React.Component {
    
    state = {
        check_ins: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/latest_unique_check_ins`)
        .then(resp=>resp.json())
        .then(check_ins => this.setState({check_ins}))
    }

    handleReceived = (data) => {
        const check_in = data.check_in.data.attributes 
        const id = parseInt(data.check_in.data.id)                                             
        const updatedCheckIn = this.state.check_ins.find(check_in => check_in.id === id)
        // if there is already a check in object with this id, do not create a new one, update old
        if (updatedCheckIn) {
            updatedCheckIn.checked_in_at = new Date()
            const copiedState = this.state.check_ins
            const findMatch = (check_in) => check_in.id === updatedCheckIn.id
            const index = this.state.check_ins.findIndex(findMatch)                            
            copiedState.splice(index,1)                                                     
            copiedState.unshift(updatedCheckIn)
            this.setState({
                check_ins: copiedState 
            })
        } else {
        // if there is no check in object with this id, create a new one
            const copiedState = this.state.check_ins            
            const new_check_in = {
                id: id,
                user_id: check_in.user_id,
                location: check_in.location,
                created_at: check_in.created_at,
                checked_in_at: check_in.checked_in_at,
                user: {name: check_in.user.name}}
            const updatedState = copiedState.filter(check_in => check_in.user_id !== new_check_in.user_id)
            updatedState.unshift(new_check_in) 
            this.setState({
                 check_ins: updatedState 
            }) 
                   
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




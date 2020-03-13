import React from 'react';
import LocationCard from './LocationCard';

class LocationFeed extends React.Component {
    
    state = {
        check_ins: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/check_ins`)
        .then(resp=>resp.json())
        .then(data=> this.setState({check_ins: data}))
    }
    
    render() {
        console.log(this.state)
        return (
            <div className='location-feed'>
                <h1>Your Team</h1>
                <ul>
                    {this.state.check_ins.map(check_in => <LocationCard key={check_in.id} user={check_in.user.name} location={check_in.location} check_in_time={check_in.created_at}/>)}
                </ul>
            </div>    
        )
    }
}

export default LocationFeed;
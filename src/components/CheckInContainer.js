import React from 'react';
import CheckInButtons from './CheckInButtons';
import CheckOutButtons from './CheckOutButtons';
import SafetyConcernBanner from './SafetyConcernBanner';
// import APICommunicator from '../services/adapter';

class CheckInContainer extends React.Component {
    
    state = {
        location: '',
        lat: '',
        long: ''
    }

    componentDidMount() {
        // const adapter = new APICommunicator();
        Promise.all([
            // adapter.getUserCheckIns(this.props.currentUser.id)
            fetch(`http://localhost:3000/users/${this.props.currentUser.id}/latest_check_in`)
                .then(resp => resp.json())
                .then(check_in =>
                    this.setState({location: check_in.location})
                ),
            // adapter.getUserSafetyConcerns(this.props.currentUser.id)
            fetch(`http://localhost:3000/users/${this.props.currentUser.id}/safety_concerns`)
                .then(resp => resp.json())
                .then(safety_concern =>
                    this.setState({
                        lat: safety_concern.latitude,
                        long: safety_concern.longitude
                })
            )
        ])
    }

    
    checkIn = e => {
        const location = e.target.name
        this.setState({ location })
        
        // const adapter = new APICommunicator();
        // const check_in = {
        //     user_id: this.props.currentUser.id,
        //     location: e.target.name,
        //     location_text: this.state.location_text
        // }
        // adapter.createCheckIn(check_in)
        
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}/check_ins`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                location: location
            })
        })
    }

    checkOut = () => {
        this.setState({ location: '' })
        
        fetch(`http://localhost:3000/check_ins_by_user_id/${this.props.currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }

    success = (pos) => {
        this.setState({lat: pos.coords.latitude})
        this.setState({long: pos.coords.longitude})
        fetch(`http://localhost:3000/safety_concern`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                latitude: this.state.lat,
                longitude: this.state.long
            })
        })
     }
        
    error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
       
    logSafetyConcern = () => {
        navigator.geolocation.getCurrentPosition(this.success, this.error)
    }
    
    render() {
        return (
            <div className='check-in-container'>  
                <p>Your Location</p>
                <div className='command-buttons'>
                    {this.state.location ? <CheckOutButtons checkOut={this.checkOut} location={this.state.location} /> : < CheckInButtons checkIn={this.checkIn}/>}
                    {this.state.lat && <SafetyConcernBanner />}
                </div>
            </div>
        )
    }
}

export default CheckInContainer;
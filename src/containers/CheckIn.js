import React from 'react';
import SafetyConcernBanner from './SafetyConcernBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHospital } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faLaptop } from '@fortawesome/free-solid-svg-icons'
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import { faLifeRing } from '@fortawesome/free-solid-svg-icons'


class CheckIn extends React.Component {
    
    state = {
        location: '',
        location_text: '',
        lat: '',
        long: ''
    }



    componentDidMount() {
        Promise.all([
            fetch(`http://localhost:3000/check_ins_by_user_id/${this.props.currentUser.id}`)
                .then(resp => resp.json())
                .then(check_in=>
                    this.setState({
                    location: check_in.location,
                    location_text: check_in.location_text})
                ),
            fetch(`http://localhost:3000/safety_concerns_by_user_id/${this.props.currentUser.id}`)
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
        this.setState({
           location: e.target.name  
        })
        fetch(`http://localhost:3000/check_ins`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                location: e.target.name,
                location_text: this.state.location_text
            })
        })
    }

    checkOut = e => {
        this.setState({
            location: '',
            location_text: ''})
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
        const checkInButtons =
            <div className='check-out'>
                <button name='Member Visit' onClick={this.checkIn}> 
                <FontAwesomeIcon icon={faHome} color='grey' /> <br />
                Member Visit</button>
                <button name='Facility' onClick={this.checkIn}> 
                    <FontAwesomeIcon icon={faHospital} color='grey' /><br />
                    Facility</button>
                <button name='Touchdown Space' onClick={this.checkIn}>
                    <FontAwesomeIcon icon={faLaptop} color='grey' /><br />
                    TD Space</button>
                <button name='Other' onClick={this.checkIn}>
                    <FontAwesomeIcon icon={faSearchLocation} color='grey' /><br />
                    Other</button>
            </div>
            
        const checkOutButtons = 
            <div className='check-safety'>
                <button name='' onClick={this.logSafetyConcern}>
                    <FontAwesomeIcon icon={faLifeRing} color='red' />
                    Log Safety Concern</button>
                <button name='' onClick={this.checkOut}>Checking out of <b> {this.state.location} </b> </button><br />
            </div>

        return (
            <div className='check-in-container'>  
                <p>Your Location</p>
                <div className='command-buttons'>
                    {this.state.location ? checkOutButtons : checkInButtons}
                    {this.state.lat && <SafetyConcernBanner />}
                </div>
            </div>
        )
    }
}

export default CheckIn;
import React from 'react';

class CheckIn extends React.Component {
    
    state = {
        location: '',
        location_text: '',
        currentUserId: 1,
        lat: '',
        long: ''
    }

    componentDidMount() {
        fetch(`http://localhost:3000/check_ins_by_user_id/${this.state.currentUserId}`)
        .then(resp => resp.json())
        .then(data => data.location ? this.setState({location: data.location}) : this.setState({location: ''}) )
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
                user_id: this.state.currentUserId,
                location: e.target.name,
                location_text: this.state.location_text
            })
        })
    }

    checkOut = e => {
        this.setState({
            location: '',
            location_text: ''})
        fetch(`http://localhost:3000/check_ins_by_user_id/${this.state.currentUserId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                checked_in_at: 'now'
            })
        })
    }

    success = (pos) => {
        this.setState({lat: pos.coords.latitude})
        this.setState({long: pos.coords.longitude})
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
                <button name='Member Visit' onClick={this.checkIn}>Member Visit</button>
                <button name='Facility' onClick={this.checkIn}>Facility</button>
                <button name='Touchdown Space' onClick={this.checkIn}>Touchdown Space</button>
                <button name='Other' onClick={this.checkIn}>Other</button>
            </div>
            
        const checkOutButtons = 
            <div className='check-safety'>
                <button name='' onClick={this.logSafetyConcern}>Log Safety Concern</button>
                <button name='' onClick={this.checkOut}>Checking out of <b> {this.state.location} </b> </button><br />
            </div>

        return (
            <div className='check-in-container'>  
                {this.state.location ? checkOutButtons : checkInButtons}
            </div>
        )
    }
}

export default CheckIn;
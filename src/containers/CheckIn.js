import React from 'react';

class CheckIn extends React.Component {
    
    state = {
        location: '',
        location_text: '',
        currentUserId: 1,
        lat: '',
        long: ''
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
                location: this.state.location,
                user_id: this.state.currentUserId,
                 
                checked_in_at: 'today'
            })
        })
    }

    checkOut = e => {
        const check_in_id = '?'
        this.setState({
           location: ''
        })
        fetch(`http://localhost:3000/check_ins/${check_in_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify('something goes here')
        })
    }

    logSafetyConcern = (lat,long) => {

    }

    render() {
        const checkInButtons =
            <div className='check-out'>
                <button name='member_visit' onClick={this.checkIn}>Member Visit</button>
                <button name='facility' onClick={this.checkIn}>Facility</button>
                <button name='touchdown_space' onClick={this.checkIn}>Touchdown Space</button>
                <button name='other' onClick={this.checkIn}>Other</button>
            </div>
            
        const checkOutButtons = 
            <div className='check-safety'>
                <button name='' onClick={this.logSafetyConcern}>Log Safety Concern</button>
                <button name='' onClick={this.checkOut}>Check Out: {this.state.location}</button><br />
            </div>

        return (
            <div className='check-in-container'>  
                {this.state.location ? checkOutButtons : checkInButtons}
            </div>
        )
    }
}

export default CheckIn;
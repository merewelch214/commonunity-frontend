import React from 'react';
import Moment from 'react-moment';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'


class SafetyConcernCard extends React.Component {
    state = {
        resolution_text: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3000/safety_concerns/${this.props.concern.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                resolution_text: this.state.resolution_text,
                resolved_at: new Date()
            })
        })
        .then(resp=>resp.json())
        .then(data=> this.props.update(data))
        this.setState({
            resolution_text: ''
        })
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const resolved = !!this.props.concern.resolved_at
        
        const Marker = () => <div><FontAwesomeIcon icon={faMapMarkerAlt} color='red' /></div>
        

        const resolutionForm = 
            <div className='resolution'>
                <p>Please contact this employee as soon as possible. Resolve the concern once you have ensured their safety.</p>
                <form onSubmit={this.handleSubmit}> 
                    <p><b>How did you resolve this safety concern?</b></p> 
                    <textarea rows={4} cols={100} name='resolution_text' value={this.state.resolution_text} onChange={this.handleChange}/>
                    <br/>
                    <button type='submit'>Resolve</button>
                </form>
            </div>

        const resolvedDetails = 
            <div className='resolution'>
                <p>This safety concern was resolved on <Moment format="LLL">{this.props.concern.resolved_at}</Moment>.</p>
                <p><b>Resolution Notes:</b> {this.props.concern.resolution_text}</p> 
            </div>

        const googleMap =                     
            <div className='map' style={{ height: '40vh', width: '40vh' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                defaultCenter={{ lat: this.props.concern.latitude, lng: this.props.concern.longitude }}
                defaultZoom={13}
                yesIWantToUseGoogleMapApiInternals>
                <Marker
                    lat={this.props.concern.latitude}
                    lng={this.props.concern.longitude}
                    />
                </GoogleMapReact>
            </div>

        return ( 
            <div className='post-card'>
                { resolved ? <h4>Resolved Safety Concern</h4> : <h4><b>{this.props.concern.user.name}</b>: Safety Concern</h4> }
                <p><b>{this.props.concern.user.name}</b> logged a safety concern on <Moment format="LLL">{this.props.concern.created_at}</Moment>.</p><br/>
                { resolved ? null : googleMap }
                { resolved ? resolvedDetails : resolutionForm }
            </div>
        )
    }
}

export default SafetyConcernCard;
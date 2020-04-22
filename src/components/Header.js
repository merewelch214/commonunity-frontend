import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    state = {
        notifications: 0
    }

    componentDidMount() { 
        fetch('http://localhost:3000/any_safety_concern')
        .then(resp=>resp.json())
        .then(numConcerns=>
            this.setState({
                notifications: numConcerns
            }))
    }

    render() {
        console.log(this.state.notifications)
        return (
            <div className='header'>
                <h1> CommonUnity </h1>
                <ul className='manager-buttons'>
                    <li>
                        {this.props.currentUser.is_manager && <NavLink to="/feed" exact onClick={this.props.showFeed}>Announcements</NavLink>}
                    </li>                    
                    <li>{this.props.currentUser.is_manager && <NavLink to="/safety_concerns"
                        exact onClick={this.props.showSafety}>Safety Concerns {this.state.notifications > 0 ? '(' + this.state.notifications + ')' : null }
                        </NavLink>}
                    </li>
                    <li> 
                        {this.props.currentUser && <NavLink to="/" exact onClick={this.props.logOut}>Log Out</NavLink> }
                    </li>
                    <li id='user-initial'>{this.props.currentUser && this.props.currentUser.name[0]}</li>
                </ul>
            </div>
        )
    }
}

export default Header;
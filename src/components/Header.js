import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className='header'>
            <h1> CommonUnity </h1>

            <ul className='manager-buttons'>
                <li>
                    {props.currentUser.is_manager && <NavLink to="/feed" exact onClick={props.showFeed}>Announcements</NavLink>}
                </li>
                <li>{props.currentUser.is_manager && <NavLink to="/safety_concerns"
                    exact onClick={props.showSafety}>Safety Concerns 
                    </NavLink>}
                </li>
                <li> 
                    {props.currentUser && <NavLink to="/" exact onClick={props.logOut}>Log Out</NavLink> }
                </li>
                <li id='user-initial'>{props.currentUser && props.currentUser.name[0]}</li>
            </ul>
        </div>
    )
}

export default Header;
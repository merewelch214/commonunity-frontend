import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className='header'>
            <h1> CommonUnity </h1>
            {props.currentUser && <NavLink to="/"
                exact><button className='logout' onClick={props.logOut}>Log Out 
                </button>
            </NavLink>}
        </div>
    )
}

export default Header;
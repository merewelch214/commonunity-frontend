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
            {props.currentUser.is_manager && <NavLink to="/feed"
                exact><button className='logout' onClick={props.showFeed}> Announcements 
                </button>
            </NavLink>}
            {props.currentUser.is_manager && <NavLink to="/safety_concerns"
                exact><button className='logout' onClick={props.showSafety}> Safety Concerns 
                </button>
            </NavLink>}

        </div>
    )
}

export default Header;
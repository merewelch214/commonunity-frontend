import React from 'react';
import Feed from './Feed';
import CommandCenter from './CommandCenter';
import SafetyContainer from './SafetyContainer';

const MainContainer = props => {
    return (
        <div className="MainContainer">
            {props.currentView === 'posts' ? <Feed currentUser={props.currentUser}/> : <SafetyContainer currentUser={props.currentUser} /> }
            <CommandCenter currentUser={props.currentUser}/>
        </div>
    );
}

export default MainContainer;
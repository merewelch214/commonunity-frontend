import React from 'react';
import CommandCenter from './CommandCenter';
import Feed from './Feed';
import SafetyContainer from './SafetyContainer';

const MainContainer = props => {
    return (
        <div className="MainContainer">
            {props.currentView === 'posts' ? <Feed currentUser={props.currentUser} adapter={props.adapter}/> : <SafetyContainer currentUser={props.currentUser} adapter={props.adapter} /> }
            <CommandCenter currentUser={props.currentUser} adapter={props.adapter}/>
        </div>
    );
}

export default MainContainer;
import React from 'react';
import Feed from './containers/Feed';
import CommandCenter from './components/CommandCenter';
import SafetyContainer from './containers/SafetyContainer';

const MainContainer = props => {
    return (
        <div className="MainContainer">
            {props.currentView === 'posts' ? <Feed currentUser={props.currentUser}/> : <SafetyContainer currentUser={props.currentUser} /> }
            <CommandCenter currentUser={props.currentUser}/>
        </div>
    );
}

export default MainContainer;
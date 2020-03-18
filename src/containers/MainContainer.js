import React from 'react';
import Feed from './Feed';
import CommandCenter from './CommandCenter';
import SafetyContainer from './SafetyContainer';

class MainContainer extends React.Component {
    // state = {
    //     toggleContainer: false
    // }
    
    render() {
        return (
        <div className="MainContainer">
            {this.props.currentView === 'posts' ? <Feed currentUser={this.props.currentUser}/> : <SafetyContainer currentUser={this.props.currentUser} /> }
            <CommandCenter currentUser={this.props.currentUser}/>
        </div>
        );
      }
}

export default MainContainer;
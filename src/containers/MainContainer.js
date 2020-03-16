import React from 'react';
import Feed from './Feed';
import CommandCenter from './CommandCenter';

class MainContainer extends React.Component {
    render() {
        return (
        <div className="MainContainer">
            <Feed />
            <CommandCenter />
        </div>
        );
      }
}

export default MainContainer;
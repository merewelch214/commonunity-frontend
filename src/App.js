import React from 'react';
import Feed from './containers/Feed';
import CommandCenter from './containers/CommandCenter';
import Header from './containers/Header';
import './App.css';


class App extends React.Component {  
  render() {
    return (
      <div className="App">
        <Header />
        <div className="MainContainer">
          <Feed />
          <CommandCenter />
        </div>
      </div>
    );
  }
}

export default App;

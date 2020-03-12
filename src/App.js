import React from 'react';
import Feed from './containers/Feed';
import Header from './containers/Header';
import './App.css';


class App extends React.Component {  
  render() {
    return (
      <div className="App">
        <Header />
        <Feed />
      </div>
    );
  }
}

export default App;

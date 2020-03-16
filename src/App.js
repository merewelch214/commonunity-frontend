import React from 'react';
import { withRouter, Route, Switch } from 'react-router';
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import MainContainer from './containers/MainContainer'
import './App.css';
import Header from './containers/Header';


class App extends React.Component {  
  state = {
    currentUser: ''
  }

  setUser = user => {
      this.setState({
      currentUser: user
    }, ()=> {this.props.history.push('/feed')})
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path='/signup' render={() => <SignUp setUser={this.setUser} />}/>
          <Route path='/login' render={() => <Login setUser={this.setUser} />}/>
          <Route path='/feed' render={() => <MainContainer currentUser={this.state.currentUser}/>}/>
          <Route path='/' render={() =>  <SignUp setUser={this.setUser} />}/>
          <Route component={Error} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);

import React from 'react';
import { withRouter, Route, Switch } from 'react-router';
import Login from './components/Login'
import SignUp from './components/SignUp'
import MainContainer from './components/MainContainer'
import './App.css';
import Header from './components/Header';

class App extends React.Component {  
  state = {
    currentUser: '',
    currentView: 'posts' 
  }

  setUser = user => {
      this.setState({
      currentUser: user
    }, ()=> {this.props.history.push('/feed')})
  }

  logOut = () => {
    this.setState({
    currentUser: ''
    }, () => {this.props.history.push('/login')}
    )
  }

  showFeed = () => {
    this.setState({
      currentView: 'posts'
    })
  }

  showSafety = () => {
    this.setState({
      currentView: 'safety'
    })
  }
  
  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} logOut={this.logOut} showFeed={this.showFeed} showSafety={this.showSafety}/>
        <Switch>
          <Route path='/signup' render={() => <SignUp setUser={this.setUser} />}/>
          <Route path='/login' render={() => <Login setUser={this.setUser} />}/>
          <Route path='/feed' render={() => <MainContainer currentUser={this.state.currentUser} currentView={this.state.currentView}/>}/>
          <Route path='/safety_concerns' render= {() => <MainContainer currentUser={this.state.currentUser} currentView={this.state.currentView}/>}/>}/>
          <Route path='/' render={() =>  <Login setUser={this.setUser} />}/>
          <Route component={Error} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);

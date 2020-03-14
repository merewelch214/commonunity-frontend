import React from 'react';

class Login extends React.Component {

    state = {
        currentUser: ''
    }

    handleSubmit = () => {
        this.state.currentUser
        console.log('do something')
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label name='username' />
                <input type='text' name='username' value={this.state.currentUser} />
                <input type='submit' name='submit' />          
            </form>
        )
    }
}

export default Login;
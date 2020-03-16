import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    state = {
        name: '',
        password: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password
            })
        })
        .then(resp=>resp.json())
        .then(response => {
            if (response.errors)
                {alert(response.errors)
            } else {
                this.props.setUser(response)}
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className='user-auth'>
                <form onSubmit={this.handleSubmit}>
                    <label name='name'>Username</label>
                    <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                    <label name='password'>Password</label>
                    <input type='text' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <button type='submit' name='submit'>Log In</button>          
                </form>
                <p> Don't have an account yet? Sign up <Link to='/signup' >here</Link>.</p>
            </div>
        )
    }
}

export default Login;
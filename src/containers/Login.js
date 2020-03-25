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
            <div className='user-div'>
                <div className='user-auth'>
                    <form onSubmit={this.handleSubmit}>
                        <ul className='user-outer'>
                            <li>
                                <label name='name'>Username</label>
                                <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                            </li>
                            <li>
                                <label name='password'>Password</label>
                                <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                            </li>
                            <li><button type='submit' name='submit'>Log In</button></li>          
                        </ul>
                    </form>
                    <p> Don't have an account yet? Sign up <Link to='/signup' >here</Link>.</p>
                </div>
            </div>
        )
    }
}

export default Login;
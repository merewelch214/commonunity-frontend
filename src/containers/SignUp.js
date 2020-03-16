import React from 'react';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {

    state = {
        name: '',
        password: '',
        password_confirmation: '',
        is_manager: false,
        team: '',
        phone_number: '',
        image_url: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.password !== this.state.password_confirmation) {
            alert('Passwords must match') }
        else {
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'},
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(user => this.props.setUser(user))
    }}

    handleChange = e => {
        const name = e.target.name
        const value = name === 'is_manager' ? e.target.checked : e.target.value;
        this.setState({
            [name]: value
        })
    }


    render() {
        return (
            <div className='user-auth'>
                <form onSubmit={this.handleSubmit}>
                    <label name='name'>Username*</label> 
                    <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                    <label name='password'>Password*</label>
                    <input type='text' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <label name='password_confirmation'>Confirm Password*</label>
                    <input type='text' name='password_confirmation' value={this.state.password_confirmation} onChange={this.handleChange}/>
                    <label name='is_manager'>Manager?</label>
                    <input type='checkbox' name='is_manager' value={this.state.is_manager} onChange={this.handleChange}/>
                    <label name='phone_number'>Phone Number</label>
                    <input type='text' name='phone_number' value={this.state.phone_number} onChange={this.handleChange}/>
                    <button type='submit' name='submit'>Sign Up</button>          
                </form>
                <p>Already have an account? Log in <Link to='/login'>here</Link>.</p>
            </div>
        )
    }
}

export default SignUp;
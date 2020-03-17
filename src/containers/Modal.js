import React from 'react';
import '../App.css';

class Modal extends React.Component {
    state = {
        title: '',
        category: '',
        summary: '',
        expires_at: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showExpiresAtField = () => {
        return (
            <span> 
                <label name='expires_at' />
                Expires At<br />
                <input type='date' name='expires_at' value={this.state.expires_at} onChange={this.handleChange}/>
            </span>
        )
    }

    clearState = () => {
        this.setState({
            title: '',
            category: '',
            summary: '',
            expires_at: ''
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const newPost = {...this.state, user_id: this.props.currentUser.id}
        fetch(`http://localhost:3000/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newPost) 
        })
        .then(res => res.json())
        .then(data => this.props.shareRecentPosts(data)) 
        this.clearState()
        this.props.handleClose()
    }

    buttonDisabled = () => {
        if (this.state.title === "" || this.state.summary === "" || this.state.category === "") {
            return true
        } else {return false}
    }
    
    render() {
        return (
            <div className={this.props.show ? "modal display-block" : "modal display-none"}>
                <section className="modal-main">
                    <div className="post-modal-header">
                        New Announcement
                        <button className='close' onClick={this.props.handleClose}>×</button>
                    </div>
                    <form onSubmit={this.handleSubmit} className='post-form'>
                        <div className='title-input'>
                            Title< br />
                            <label name='title' />
                            <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/><br />
                        </div>
                        <div className='description-input'>
                            Description<br />
                            <label name='summary' />
                            <input type='textarea' name='summary' value={this.state.summary} onChange={this.handleChange} id='description-box'/> <br/>
                        </div>
                        <span className='category-input'>    
                            Category <br />
                            <label name='category' />
                            <select name='category' value={this.state.category} onChange={this.handleChange}>
                                <option value='announcement'>Announcement</option>
                                <option value='new_feature'>New Feature</option>
                                <option value='shout_out'>Shout Out</option>
                                <option value='urgent_alert'>Urgent Alert</option>
                            </select>
                            {this.state.category === 'urgent_alert' ? this.showExpiresAtField() : null }
                        </span>
                        <div className='submit'>
                            <button type="submit" value="Submit" onClick={this.props.handleSubmit} disabled={this.buttonDisabled()}>Submit</button> 
                        </div>
                    </form>
                   
                </section>
            </div>
            );
    }
};

export default Modal;
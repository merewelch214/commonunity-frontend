import React from 'react';

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
        .then(resp => resp.json())
        .then(data => 
            this.props.shareRecentPosts(({...data, likes: [], comments: [], user: {name: this.props.currentUser.name}}))) 
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
                        <div className='close' onClick={this.props.handleClose}>×</div>
                    </div>
                    <div className="user-outer">
                        <form onSubmit={this.handleSubmit} className='post-form'>
                        <ul>
                        <li>
                            <label name='title'>Title</label>
                            <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/><br /><br />
                        </li>
                        <li>
                            <label name='summary'>Description</label>
                            <textarea name='summary' value={this.state.summary} onChange={this.handleChange} id='description-box' rows={9} cols={50}/> <br/>
                        </li>
                        <li>
                            <label name='category'>Category</label>
                            <select name='category' value={this.state.category} onChange={this.handleChange}>
                                <option value='announcement'>Announcement</option>
                                <option value='new_feature'>New Feature</option>
                                <option value='shout_out'>Shout Out</option>
                                <option value='urgent_alert'>Urgent Alert</option>
                            </select>
                        </li>
                        
                            <li>{this.state.category === 'urgent_alert' ? this.showExpiresAtField() : null }</li>
                            
                            <li><button type="submit" value="Submit" onClick={this.props.handleSubmit} disabled={this.buttonDisabled()}>Submit</button> </li>   
                            </ul>
                    </form>  
                    </div> 
                </section>
            </div>
            );
    }
};

export default Modal;
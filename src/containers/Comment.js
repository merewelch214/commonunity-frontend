import React from 'react';

class Comment extends React.Component {
    state = {
        commentText: ''
    }
    

    handleChange = (e) => {
        this.setState({commentText: e.target.value})
    }

    handleSubmit= () => {
        console.log('fetch request goes here')
    }

    render() {
        return (
            <form>
                <input type='text-area' onChange={this.handleChange} />
                <button className='post-manager' onSubmit={this.handleSubmit}>Comment</button>
            </form>
           
        )
    }
}

export default Comment;
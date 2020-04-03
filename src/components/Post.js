import React from 'react';
import Moment from 'react-moment';
import Like from './Like'
import Comment from './Comment'

class Post extends React.Component {
    
    state = {
        likes: [],
        comments: [],
        commentText: ''
    }

    componentDidMount() {
        this.setState({
            likes: this.props.likes,
            comments: this.props.comments
        })
    }

    deletePost = () => {
        fetch(`http://localhost:3000/posts/${this.props.id}`, {
           method: 'DELETE'})
        this.props.removePost(this.props.id)
    }

    addLike = () => {    
        fetch(`http://localhost:3000/posts/${this.props.id}/likes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                post_id: this.props.id
            })
        })
        .then(resp=>resp.json())
        .then(data=>this.setState({likes: [...this.state.likes, data]}))
    }

    removeLike = (id) => {
        this.setState({
            likes: this.state.likes.filter(like => like.id !== id)
        })
        fetch(`http://localhost:3000/posts/${this.props.id}/likes/${id}`, {
            method: 'DELETE'
        })
    }

    addComment = (e, commentText) => {
        e.preventDefault()
        fetch(`http://localhost:3000/posts/${this.props.id}/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                post_id: this.props.id,
                content: commentText
            })
        })
        .then(resp=>resp.json())
        .then(data=> this.setState({comments: [...this.state.comments, data], commentText: ''}))
    }


    handleChange = (e) => {
        this.setState({commentText: e.target.value})
    }

    render() {
        return ( 
            <div id={this.props.category}>
                <div className='post-card'>
                    <h4 className='title'>{this.props.title} </h4>
                    <p>{this.props.summary}</p><br/>
                    <div className='post-info-container'>
                        <div className='post-info'>
                            <p className='time'><Moment format="LLL">{this.props.created_at}</Moment></p>
                            {this.state.likes.length} {this.state.likes.length === 1 ? 'like' : 'likes'}
                            <Like currentUser={this.props.currentUser} removeLike={this.removeLike} addLike={this.addLike} likes={this.state.likes}/>
                        </div>
                        <div className='post-data'>
                            <p>{this.state.comments.length} {this.state.comments.length === 1 ? 'comment' : 'comments'}</p>
                        </div>
                        <form onSubmit={(e)=>this.addComment(e, this.state.commentText)}>
                            <input type='text-area' onChange={this.handleChange} />
                            <button className='post-manager' onSubmit={this.handleSubmit}>Comment</button>
                        </form>
                        <div className='post-mgmt-buttons'>
                            {this.props.currentUser.is_manager && <button className='post-manager' onClick={this.deletePost}> Delete </button>}
                        </div>
                        {this.state.comments.map(comment=> <Comment key={comment.id} {...comment} />)}
                    </div>
                </div>
            </div>
        )
    }   
}

export default Post;
import React from 'react';
import Moment from 'react-moment';
import Comment from './Comment';
import Like from './Like';
class Post extends React.Component {
    
    state = {
        likes: [],
        comments: [],
        commentText: '',
        formToggle: false,
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

    toggleForm = () => {
        this.setState({ formToggle: !this.state.formToggle })
    }
    render() {
        
        const commentForm = 
            <div className='comment-form'>
                <form onSubmit={(e)=>this.addComment(e, this.state.commentText)}>
                    <input type='text-area' onChange={this.handleChange} />
                    <button className='post-manager' onSubmit={this.addComment}>Add Comment</button>
                </form>
            </div>

        return ( 
            <div id={this.props.category}>
                <div className='post-card'>
                    <h4 className='title'>{this.props.title} </h4>
                    <p>{this.props.summary}</p><br/>
                    <div className='admin'>
                        <span className='time'> Posted by {this.props.user.name ? this.props.user.name :            this.props.currentUser.name}</span>
                        <Moment format="LLL" className='time'>{this.props.created_at}</Moment> 
                        <div className='post-mgmt-buttons'>
                            {this.props.currentUser.is_manager && <button className='delete' onClick={this.deletePost}> Delete </button>}
                        </div>
                    </div>
                    <div className='post-info-container'>
                        <div className='likes-info'>
                            <div className='post-info'>
                                {this.state.likes.length} {this.state.likes.length === 1 ? 'like, ' : 'likes, '} 
                                {this.state.comments.length} {this.state.comments.length === 1 ? 'comment' : 'comments'}
                            </div>
                            <div className='post-data'>   
                                <Like currentUser={this.props.currentUser} removeLike={this.removeLike} addLike={this.addLike} likes={this.state.likes}/>
                                <button className='post-manager' onClick={this.toggleForm}>Comment</button>
                            </div>
                        </div>
                        <div className='comment-form-container'>
                           {this.state.formToggle && commentForm}
                        </div>
                        {this.state.comments.map(comment=> <Comment key={comment.id} {...comment} />)}

                        
                    </div>
                </div>
            </div>
        )
    }   
}

export default Post;
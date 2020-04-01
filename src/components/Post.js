import React from 'react';
import Moment from 'react-moment';
import Like from '../containers/Like'
import Comment from '../containers/Comment'

class Post extends React.Component {
    
    state = {
        likes: 0
    }


    componentDidMount() {
        fetch(`http://localhost:3000/posts/${this.props.id}/likes/`)
        .then(resp=>resp.json())
        .then(likes=>this.setState({likes: likes.length})
        )
    }
    
    deletePost = () => {
        fetch(`http://localhost:3000/posts/${this.props.id}`, {
           method: 'DELETE'})
        this.props.removePost(this.props.id)
    }

    addLike = () => {
       
        this.setState({likes: this.state.likes + 1})
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
    }

    removeLike = () => {
        this.setState({likes: this.state.likes - 1})
        fetch(`http://localhost:3000/posts/${this.props.id}/likes/`, {})
    }

    render() {
        return ( 
            <div id={this.props.category}>
                <div className='post-card'>
                    <h4 className='title'>{this.props.title} </h4>
                    <p>{this.props.summary}</p><br/>
                    <div className='post-info-container'>
                        <div className='post-info'>
                            <p>{this.props.category}</p>
                            <p className='time'><Moment format="LLL">{this.props.created_at}</Moment></p>
                        </div>
                        <div className='post-mgmt-buttons'>
                            {this.props.currentUser.is_manager && <button className='post-manager' onClick={this.deletePost}> Delete </button>}
                            <Comment currentUser={this.props.currentUser} />
                            <Like currentUser={this.props.currentUser} removeLike={this.removeLike} addLike={this.addLike} likes={this.state.likes}/>
                            <p>{this.state.likes} likes</p>
                        </div>
                    </div>
                   
                </div>
                
                
            </div>
        )
    }   
}

export default Post;
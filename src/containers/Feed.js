import React from 'react';
import Post from '../components/Post';
import Modal from './Modal';

class Feed extends React.Component {
    state = {
        posts: [],
        showNewPostModal: false
    }

    componentDidMount() {
        fetch(`http://localhost:3000/posts`)
        .then(resp => resp.json())
        .then(data => this.setState({posts: data}))
    }

    toggleModal = () => {
        this.setState({ showNewPostModal: !this.state.showNewPostModal });
    };

    getRecentPosts = (newPost) => {
        this.setState({ 
            posts: [...this.state.posts, newPost]
        })
    }

    render() {
        const sortedPosts = [...this.state.posts].sort((a, b) => b.id - a.id)

        return (
            <div className='feed'>
                <div className='feed-header'>
                    <p> Announcements </p>
                    {this.props.currentUser.is_manager 
                        && 
                    <button onClick={this.toggleModal}>New Announcement</button>}
                </div>
                <Modal show={this.state.showNewPostModal} 
                    handleClose={this.toggleModal} 
                    currentUser={this.props.currentUser} 
                    shareRecentPosts={this.getRecentPosts}/> 
                <div className='feed-container'> 
                    {sortedPosts.map(post => <Post {...post} key={post.id}/>)}
                </div>
            </div>  
        )
    }
}

export default Feed;
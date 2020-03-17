import React from 'react';
import Post from './Post';
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
            <div className='Feed'>
                {this.props.currentUser.is_manager 
                    && 
                <button id='new-post' onClick={this.toggleModal}>New Announcement</button>}
                <Modal show={this.state.showNewPostModal} 
                    handleClose={this.toggleModal} 
                    currentUser={this.props.currentUser} 
                    shareRecentPosts={this.getRecentPosts}/> 
                <div id='feedContainer'> 
                    {sortedPosts.map(post => <Post {...post} key={post.id}/>)}
                </div>
            </div>  
        )
    }
}

export default Feed;
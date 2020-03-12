import React from 'react';
import Post from './Post';
import Modal from './Modal';

export default class Feed extends React.Component {
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
        console.log('toggled')
        console.log(this.state)
        this.setState({ showNewPostModal: !this.state.showNewPostModal });
    };

    render() {
        return (
            <div>
                <Modal show={this.state.showNewPostModal} handleClose={this.toggleModal} />
                <button onClick={this.toggleModal}>Create New Post</button>

                <div id='feedContainer'> 
                    {this.state.posts.map(post => <Post {...post} key={post.id}/>)}
                </div>
            </div>  
        )
    }

}

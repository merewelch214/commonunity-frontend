import React from 'react';

class Comment extends React.Component {

    render() {
        return (
            <p>{this.props.content}</p>
        )
    }
}

export default Comment;
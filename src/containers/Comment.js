import React from 'react';

class Comment extends React.Component {

    render() {
        console.log(this.props)
        return (
            <p>{this.props.content}</p>
        )
    }
}

export default Comment;
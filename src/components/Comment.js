import React from 'react';

class Comment extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div>
                <b><p>username</p></b>
                <p>{this.props.content}</p>
            </div>
        )
    }
}

export default Comment;
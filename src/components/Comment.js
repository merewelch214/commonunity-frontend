import React from 'react';
import Moment from 'react-moment';

class Comment extends React.Component {
    state = {
        user: ''
    }

    componentDidMount() {
        fetch(`http://localhost:3000/comments/${this.props.id}`)
        .then(resp=>resp.json())
        .then(comment=>this.setState({user: comment.user.name}))
    }

    render() {
        return (
            <div className='comment-card'>
                <b> {this.state.user} </b>{this.props.content}< br/>
                <Moment format="LLL" className='time'>{this.props.created_at}</Moment>
            </div>
        )
    }
}

export default Comment;
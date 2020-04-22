import React from 'react';
import Moment from 'react-moment';

class Comment extends React.Component {


    render() {

        return (
            <div className='comment-card'>
                <b> Username </b>{this.props.content}< br/>
                <Moment format="LLL" className='time'>{this.props.created_at}</Moment>
            </div>
        )
    }
}

export default Comment;
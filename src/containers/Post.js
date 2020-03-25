import React from 'react';
import Moment from 'react-moment';

const Post = props => {
    return ( 
        <div id={props.category}>
            <div className='post-card'>
                <h4 className='title'>{props.title}</h4>
                <p>{props.summary}</p><br/>
                <p>{props.category}</p>
                <p className='time'><Moment format="LLL">{props.created_at}</Moment></p>
            </div>
        </div>
    )
}

export default Post;
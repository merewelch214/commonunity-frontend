import React from 'react';
import Moment from 'react-moment';
// import Likes from './Likes'
// import Comments from './Comments'

const Post = props => {
    return ( 
        <div id={props.category}>
            <div className='post-card'>
                <h4 className='title'>{props.title}</h4>
                <p>{props.summary}</p><br/>
                <p>{props.category}</p>
                <p className='time'><Moment format="LLL">{props.created_at}</Moment></p>
            </div>
            {/* <Likes />
            <Comments /> */}
        </div>
    )
}

export default Post;
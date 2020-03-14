import React from 'react';
import Moment from 'react-moment';

function Post(props) {
    return ( 
        <div className='post-card'>
        {/* <div className={props.category}> */}
            <h1>{props.title}</h1>
            <p><Moment format="LLL">{props.created_at}</Moment></p>
            <p>{props.summary}</p>
        </div>
    )
}

export default Post;
import React from 'react';

function Post(props) {
    return (
        <div className={props.category}>
            <h1>{props.title}</h1>
            <p>{props.summary}</p>
            <p>{props.created_at}</p>
        </div>
    )
}

export default Post;
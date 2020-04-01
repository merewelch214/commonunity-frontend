import React from 'react';

const Like = props => {
    //if currentUser in likes array, show unlike button
    console.log(props)
    return (
        <button className='post-manager' onClick={props.addLike}>Like</button>
    )
}

export default Like;
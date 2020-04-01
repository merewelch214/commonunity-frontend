import React from 'react';

const Like = props => {

    
    const foundLike = props.likes.find(like => like.user_id === props.currentUser.id)

    const showButton = () => {
        if (foundLike) {
            return <button className='post-manager' onClick={() => props.removeLike(foundLike.id)}>Unlike</button>
        } else {
            return <button className='post-manager' onClick={props.addLike}>Like</button>
        }
    }
    return (
        showButton()
    )
}

export default Like;
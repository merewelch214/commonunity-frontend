import React from 'react';

function Comment() {
    return (
        <form>
            <input type='text' name='comment-text'/>
            <button type='submit'>Comment</button>
        </form>
    )
}

export default Comment
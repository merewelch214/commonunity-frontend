import React from "react";

const Like = (props) => {
  const { currentUser, likes, removeLike, addLike } = props;
  const foundLike = likes.find((like) => like.user_id === currentUser.id);

  const showButton = () => {
    if (foundLike) {
      return (
        <button
          className="post-manager"
          onClick={() => removeLike(foundLike.id)}
        >
          Unlike
        </button>
      );
    } else {
      return (
        <button className="post-manager" onClick={addLike}>
          Like
        </button>
      );
    }
  };
  return showButton();
};

export default Like;

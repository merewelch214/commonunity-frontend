import React, { useEffect, useState } from "react";
import Moment from "react-moment";

const Comment = (props) => {
  const [user, setUser] = useState("");
  const { content, created_at } = props;

  useEffect(() => {
    async function fetchData() {
      await fetch(`http://localhost:3000/comments/${this.props.id}`)
        .then((resp) => resp.json())
        .then((comment) => setUser({ user: comment.user.name }));
    }
    fetchData();
  }, []);

  return (
    <div className="comment-card">
      <b> {user} </b>
      {content}
      <br />
      <Moment format="LLL" className="time">
        {created_at}
      </Moment>
    </div>
  );
};

export default Comment;

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Post from "./Post";
import APICommunicator from "../services/adapter";

const Feed = (props) => {
  const { currentUser } = props;

  const [state, setState] = useState({
    posts: [],
    showNewPostModal: false,
  });

  useEffect(() => {
    function fetchData() {
      const adapter = new APICommunicator();
      adapter.getPosts().then((posts) => setState({ ...state, posts }));
    }
    fetchData();
  }, []);

  const toggleModal = () => {
    setState({ ...state, showNewPostModal: !state.showNewPostModal });
  };

  const getRecentPosts = (newPost) => {
    setState({
      ...state,
      posts: [...state.posts, newPost],
    });
  };

  const removePost = (oldPost) => {
    setState({
      ...state,
      posts: state.posts.filter((post) => post.id !== oldPost),
    });
  };

  const sortedPosts = [...state.posts].sort((a, b) => b.id - a.id);

  return (
    <div className="feed">
      <div className="feed-header">
        <p> Announcements </p>
        {currentUser.is_manager && (
          <button onClick={toggleModal}>New Announcement</button>
        )}
      </div>
      <Modal
        show={state.showNewPostModal}
        handleClose={toggleModal}
        currentUser={currentUser}
        shareRecentPosts={getRecentPosts}
      />
      <div className="feed-container">
        {sortedPosts.map((post) => (
          <Post
            {...post}
            key={post.id}
            currentUser={currentUser}
            removePost={removePost}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;

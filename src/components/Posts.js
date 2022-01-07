import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Post, PostsWrapper } from "../Styling";

const Posts = () => {
  const URL = "https://localhost:44383/api/posts";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [URL]);

  const getPosts = async () => {
    await axios
      .get(URL)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const deletePost = async (id) => {
    await axios
      .delete(URL + "/" + id)
      .then((res) => {
        console.log("RES:", res);
        getPosts();
      })
      .catch((err) => {
        console.log("ERR", err);
        // setMessage("API ERROR");
      });
  };
  return (
    <>
      <h1 className="text-center">Posts</h1>
      <PostsWrapper>
        {posts.map((post) => (
          <Post key={post.id}>
            <div>
              <h2>{post.title}</h2>
              <p>{post.text}</p>
            </div>
            <div>
              <p>Written by: {post.createdBy}</p>
              <Button
                variant="danger"
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                Delete
              </Button>
            </div>
          </Post>
        ))}
      </PostsWrapper>
    </>
  );
};

export default Posts;

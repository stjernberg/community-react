import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Post, PostsWrapper } from "../Styling";

const Posts = () => {
  const URL = "https://localhost:44383/api/posts";
  // const deleteURL = `https://localhost:44383/api/posts/${id}`
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  // const deleteURL = `https://localhost:44342/People/${id}`;

  //Deletes a post with matched id, by making a delete request.
  const deletePost = async (id) => {
    const deleteURL = `https://localhost:44342/People/${id}`;
    await axios
      .delete(deleteURL)
      .then((res) => {
        console.log("RES:", res);
        if (res.status === 202) {
          setMessage("Person is deleted!");
        } else {
          setMessage("API ERROR");
        }
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };
  return (
    <div>
      <h1 className="text-center">Posts</h1>
      <PostsWrapper>
        {posts.map((post) => (
          <>
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
          </>
        ))}
      </PostsWrapper>
    </div>
  );
};

export default Posts;

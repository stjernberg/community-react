import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, deletePost } from "../redux/postSlice";
import { DeleteForever, Edit } from "@material-ui/icons";
import { Post, PostsWrapper } from "../Styling";

const Posts = () => {
  const URL = "https://localhost:44383/api/posts";
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const editPost = async (id) => {
    await axios
      .put(URL + "/" + id)
      .then((res) => {
        console.log("RES:", res);
        // getPosts();
        dispatch(getPosts());
      })
      .catch((err) => {
        console.log("ERR", err);
        // setMessage("API ERROR");
      });
  };

  return (
    <>
      <h1 className="text-center mb-4">Posts</h1>
      <PostsWrapper>
        {posts.map((post) => (
          <Post key={post.id}>
            <div>
              <h2>{post.title}</h2>
              <p>{post.text}</p>
            </div>
            <div>
              <p>Written by: {post.createdBy}</p>
              <p>Category: {post.category.categoryName}</p>

              <span
                className="text-danger margin-right"
                role="button"
                onClick={() => {
                  dispatch(deletePost(post.id));
                  // deletePost(post.id);
                }}
              >
                Delete
                <DeleteForever className="icon" />
              </span>
              <span
                role="button"
                className="text-warning "
                onClick={() => {
                  editPost(post.id);
                }}
              >
                Edit
                <Edit className="icon" />
              </span>
            </div>
          </Post>
        ))}
      </PostsWrapper>
    </>
  );
};

export default Posts;

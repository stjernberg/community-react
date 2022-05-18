import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPosts, deletePost } from "../redux/postSlice";
import { checkUsersRole } from "../redux/userSlice";
import { DeleteForever, Edit } from "@material-ui/icons";
import { Post, PostsWrapper } from "../Styling";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { isAuth } = useSelector((state) => state.admin);
  const { rolesOfUser } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(checkUsersRole());
  }, [dispatch]);

  return (
    <>
      {console.log("Roles: ", rolesOfUser)}
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
              {isAuth && (
                <>
                  <span
                    className="text-danger margin-right"
                    role="button"
                    onClick={() => {
                      dispatch(deletePost(post.id));
                    }}
                  >
                    Delete
                    <DeleteForever className="icon" />
                  </span>
                  <span
                    role="button"
                    className="text-warning "
                    onClick={() => {
                      history.push(`/editPost/${post.id}`);
                    }}
                  >
                    Edit
                    <Edit className="icon" />
                  </span>
                </>
              )}
            </div>
          </Post>
        ))}
      </PostsWrapper>
    </>
  );
};

export default Posts;

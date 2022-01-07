import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FormWrapper } from "../Styling";

const PostForm = () => {
  const URL = "https://localhost:44383/api/posts";
  const [posts, setPosts] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("DATA: ", data);
    const newPost = {
      title: data.title,
      text: data.text,
      createdBy: data.createdBy,
      category: data.category.categoryName,
    };

    const savePost = async () => {
      await axios
        .post(URL, newPost)
        .then((response) => {
          setPosts([...posts, newPost]);
          console.log(response.data);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    };
    savePost();
  };

  return (
    <FormWrapper>
      <>
        <h2 className="mt-3 text-center">Add new post</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicText">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              {...register("title", { required: true, minLength: 2 })}
            />
            {errors.firstName && (
              <span className="text-danger">Title is Required!</span>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-2">Text</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Text"
              {...register("text", { required: true, minLength: 10 })}
            />
            {errors.lastName && (
              <span className="text-danger">
                Min 10 characters is Required!
              </span>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-2">Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author"
              {...register("createdBy", { required: true, minLength: 2 })}
            />
            {errors.email && (
              <span className="text-danger">Author is required</span>
            )}
          </Form.Group>
          {/* <Form.Group controlId="formBasicText">
            <Form.Label className="mt-2">Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category"
              {...register("category", { required: true })}
            />  </Form.Group>*/}

          <Form.Select
            {...register("category.categoryName")}
            aria-label="Choose category"
          >
            <option>Choose category</option>
            {posts.map((post) => (
              <option value={post.category.categoryName} key={post.category.id}>
                post.category.categoryName
              </option>
            ))}
          </Form.Select>

          <div className="text-center mt-3">
            <Button variant="info" type="submit">
              Add post
            </Button>
          </div>
        </Form>
      </>
    </FormWrapper>
  );
};

// const FormWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
export default PostForm;

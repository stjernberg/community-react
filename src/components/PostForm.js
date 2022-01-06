import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FormWrapper } from "../Styling";

const PostForm = () => {
  const URL = "https://localhost:44383/api/posts";
  const [post, setPost] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      text: "",
      title: "",
      createdBy: "",
      category: "",
    },
  });

  const onSubmit = (data) => {
    console.log("DATA: ", data);
    const newPost = {
      title: data.title,
      text: data.text,
      createdBy: data.createdBy,
      category: data.category,
    };

    const savePost = async () => {
      await axios
        .post(URL, newPost)
        .then((response) => {
          setPost([...post, newPost]);
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
            <Form.Label>First name</Form.Label>
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
          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-2">Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category"
              {...register("category", { required: true })}
            />
          </Form.Group>
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

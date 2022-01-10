import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { setMessage } from "../redux/postSlice";
import { FormWrapper } from "../Styling";

const PostForm = () => {
  const URL = "https://localhost:44383/api/posts";
  const categoryURL = "https://localhost:44383/api/categories";
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const message = useSelector((state) => state.post.message);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
  }, [URL]);

  const getCategories = async () => {
    await axios
      .get(categoryURL)
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

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
      categoryId: data.categoryId,
    };

    const savePost = async () => {
      await axios
        .post(URL, newPost)
        .then(() => {
          setPosts([...posts, newPost]);
          dispatch(setMessage("Post successfully added!"));
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    };
    savePost();
  };

  return (
    <>
      <h2 className="mt-3 text-center">Add new post</h2>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicText">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              {...register("title", { required: true, minLength: 2 })}
            />
            {errors.title && (
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
            {errors.text && (
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
            {errors.createdBy && (
              <span className="text-danger">Author is required</span>
            )}
          </Form.Group>
          <Form.Select
            {...register("categoryId", { required: true, valueAsNumber: true })}
            aria-label="Choose category"
            className="mt-2"
          >
            <option>Choose category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.categoryName}
              </option>
            ))}
          </Form.Select>
          {errors.title && (
            <span className="text-danger">Category is required</span>
          )}
          <div className="text-center mt-3">
            <Button variant="info" type="submit">
              Add post
            </Button>
          </div>
        </Form>
      </FormWrapper>
      {message && <h4>{`${message}`}</h4>}
    </>
  );
};

export default PostForm;

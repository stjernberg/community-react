import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
  getPost,
  addPost,
  getCategories,
  editPost,
  setMessage,
} from "../redux/postSlice";
import { FormWrapper } from "../Styling";

const PostForm = () => {
  const { categories } = useSelector((state) => state.post);
  const { message } = useSelector((state) => state.post);
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;

  useEffect(() => {
    if (!isAddMode) {
      dispatch(getPost(id));
      dispatch(getCategories());
      dispatch(setMessage(null));
    }
  }, [dispatch, id, isAddMode]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  if (!isAddMode) {
    let fields = ["title", "text", "createdBy", "categoryId"];
    fields.forEach((field) => setValue(field, post[field]));
  }

  const onSubmit = (data) => {
    console.log("DATA: ", data);
    const newPost = {
      title: data.title,
      text: data.text,
      createdBy: data.createdBy,
      categoryId: data.categoryId,
    };

    return isAddMode ? createPost(newPost) : updatePost(id, newPost);
  };
  const createPost = (newPost) => {
    dispatch(addPost(newPost));
  };

  const updatePost = (id, newPost) => {
    dispatch(editPost(id, newPost));
  };

  return (
    <>
      <h2 className="mt-3 text-center">
        {isAddMode ? "Wirte a post" : "Edit Post"}
      </h2>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formTitle">
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
          <Form.Group controlId="formPassword">
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
              {isAddMode ? "Add" : "Edit"}
            </Button>
          </div>
        </Form>
      </FormWrapper>
      {message && <h4>{`${message}`}</h4>}
      <span
        className="font-bold"
        role="button"
        onClick={() => history.push("/posts")}
      >
        View posts
        <DoubleArrowIcon className="icon" />
      </span>

      {message && <p>{message}</p>}
    </>
  );
};

export default PostForm;

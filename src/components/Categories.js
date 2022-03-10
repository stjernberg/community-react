import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { DeleteForever } from "@material-ui/icons";
import { Table, Form, Button } from "react-bootstrap";
import { getCategories, addCategory, deleteCategory } from "../redux/postSlice";
import { Wrapper } from "../Styling";

const Categories = () => {
  const message = useSelector((state) => state.post.message);
  const categories = useSelector((state) => state.post.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("DATA: ", data);
    const category = {
      categoryName: data.categoryName,
    };

    dispatch(addCategory(category));
  };

  return (
    <>
      <Wrapper>
        <h1 className="text-center mb-3">Categories</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          {categories.map((category) => (
            <tbody key={category.id}>
              <tr>
                <td>{category.id}</td>
                <td>{category.categoryName}</td>
                <td>
                  <span
                    role="button"
                    className="text-danger font-bold"
                    onClick={() => {
                      dispatch(deleteCategory(category.id));
                    }}
                  >
                    Delete
                    <DeleteForever className="icon" />
                  </span>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicText">
            <Form.Control
              type="text"
              placeholder="Name"
              {...register("categoryName", { required: true, minLength: 3 })}
            />
            {errors.categoryName && (
              <span className="text-danger">Min length is 3 characters!</span>
            )}
          </Form.Group>
          <Button variant="info" type="submit" className="mt-3 mb-3">
            Add category
          </Button>
        </Form>
        {message && <h4>{`${message}`}</h4>}
      </Wrapper>
    </>
  );
};

export default Categories;

import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, setToken } from "../redux/userSlice";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedIn } = useSelector((state) => state.user);
  const token = sessionStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("DATA: ", data);

    const loginUser = {
      userName: data.userName,
      password: data.password,
    };

    dispatch(userLogin(loginUser));
    if (loggedIn) {
      <Redirect to="/dashbord" />;
      // history.push("/dashboard");
    }

    // const token = sessionStorage.getItem("token");

    // dispatch(setToken(userToken?.token));
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            {...register("userName", { required: true })}
          />
          {errors.userName && (
            <span className="text-danger">Username is required!</span>
          )}
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">Password is required!</span>
          )}
        </Form.Group>
        <div className="text-center mt-3">
          <Button variant="info" type="submit" className="mt-3 mb-3">
            Login
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Login;

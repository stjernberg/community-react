import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { FormWrapper } from "../Styling";
import { userReg, editUser, getEditUser } from "../redux/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isAddMode = !id;
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAddMode) {
      dispatch(getEditUser(id));
    }
  }, [dispatch, id, isAddMode]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  if (!isAddMode) {
    let fields = ["firstName", "lastName", "email", "phoneNr", "userName"];
    fields.forEach((field) => setValue(field, user[field]));
  }

  const onSubmit = (data) => {
    console.log("DATA: ", data);
    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNr: data.phoneNr,
      userName: data.userName,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    return isAddMode ? createUser(newUser) : updateUser(id, newUser);
  };

  const createUser = (newUser) => {
    dispatch(userReg(newUser));
  };

  const updateUser = (id, newUser) => {
    dispatch(editUser(id, newUser));
  };

  return (
    <>
      <h2 className="mt-3 text-center">
        {isAddMode ? "Register" : "Edit Profile"}
      </h2>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              {...register("firstName", { required: true, minLength: 2 })}
            />
            {errors.firstName && (
              <span className="text-danger">First name is Required!</span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              {...register("lastName", { required: true, minLength: 2 })}
            />
            {errors.lastName && (
              <span className="text-danger">Last name is Required!</span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className="text-danger">
                Correct email format is Required!
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              {...register("phoneNr")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              {...register("userName", { required: true, minLength: 2 })}
            />
            {errors.lastName && (
              <span className="text-danger">Username is Required!</span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              {...register("password", { required: true, min: 6 })}
            />
            {errors.passwprd && (
              <span className="text-danger">
                Correct passsword is Required!
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              {...register("confirmPassword", { required: true, min: 6 })}
            />
            {errors.passwpod && (
              <span className="text-danger">
                Correct passsword is Required!
              </span>
            )}
          </Form.Group>

          <div className="text-center mt-3">
            <Button variant="info" type="submit">
              {isAddMode ? "Register" : "Edit"}
            </Button>
          </div>
        </Form>
      </FormWrapper>
    </>
  );
};

export default Register;

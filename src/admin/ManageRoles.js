import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Button } from "react-bootstrap";

import { useForm } from "react-hook-form";

import { getRoles, getUsers, addRole } from "../redux/adminSlice";
import { Wrapper } from "../Styling";
import Roles from "./Roles";

const ManageRoles = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getRoles());
    // dispatch(getUsers());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("DATA: ", data);
    const role = {
      roleName: data.roleName,
    };

    dispatch(addRole(role));
  };

  return (
    <>
      <Wrapper>
        <h2>Roles</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Role name</th>
              <th></th>
            </tr>
          </thead>
          {roles.map((role) => (
            <Roles key={role.id} {...role} />
          ))}
        </Table>

        <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <Form.Group controlId="formBasicText">
            <Form.Control
              type="text"
              placeholder="Name"
              {...register("roleName", { required: true, minLength: 3 })}
            />
            {errors.name && (
              <span className="text-danger">Min length is 3 characters!</span>
            )}
          </Form.Group>
          <div className="mt-2 d-flex justify-content-center">
            <Button variant="info" type="submit" className="mt-3 mb-3">
              Add role
            </Button>
          </div>
        </Form>
      </Wrapper>
    </>
  );
};

export default ManageRoles;

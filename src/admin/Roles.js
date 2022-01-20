import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { DeleteForever } from "@material-ui/icons";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { deleteRole } from "../redux/adminSlice";

const Roles = ({ name, id }) => {
  // const users = useSelector((state) => state.user.users);
  // const {role} = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>
            <span
              role="button"
              className="text-danger font-bold"
              onClick={() => {
                dispatch(deleteRole(id));
              }}
            >
              Delete
              <DeleteForever className="icon" />
            </span>
          </td>

          <td>
            <span
              role="button"
              className="text-primary font-bold"
              onClick={() => {
                history.push(`/addRoles/${id}`);
              }}
            >
              Manage
              <ManageAccountsIcon className="icon" />
            </span>
          </td>
        </tr>
      </tbody>
      {/* <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Select
          {...register("categoryId", { required: true, valueAsNumber: true })}
          aria-label="Choose category"
          className="mt-2"
        >
          <option>Choose category</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.categoryName}
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
      </Form> */}
    </>
  );
};

export default Roles;

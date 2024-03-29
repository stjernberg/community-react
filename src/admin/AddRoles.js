import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { DeleteForever, Add } from "@material-ui/icons";
import {
  getRole,
  getUserRoles,
  addUserRole,
  removeUserRole,
} from "../redux/adminSlice";
import { Wrapper } from "../Styling";

const AddRoles = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.admin);
  const { usersNoRole } = useSelector((state) => state.admin);
  const { usersWithRole } = useSelector((state) => state.admin);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getRole(id));
    dispatch(getUserRoles(id));
  }, [dispatch, id]);

  return (
    <>
      <Wrapper>
        <h1>Manage roles {role.name} </h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Users asigned to {role.name}</th>
            </tr>
          </thead>

          <tbody>
            {usersWithRole.map((user, index) => (
              <tr key={index}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>
                  <span
                    role="button"
                    className="text-danger font-bold"
                    onClick={() => {
                      dispatch(removeUserRole(user.id, id));
                    }}
                  >
                    Remove
                    <DeleteForever className="icon" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Users not assigned to {role.name}</th>
            </tr>
          </thead>
          <tbody>
            {usersNoRole.map((user, index) => (
              <tr key={index}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>
                  <span
                    role="button"
                    className="text-primary font-bold"
                    onClick={() => {
                      dispatch(addUserRole(user.id, id));
                    }}
                  >
                    Add
                    <Add className="icon" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          variant="info"
          onClick={() => {
            history.push("/manageRoles");
          }}
        >
          Back
        </Button>
      </Wrapper>
    </>
  );
};

export default AddRoles;

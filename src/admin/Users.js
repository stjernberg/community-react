import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { getUsers, deleteUser } from "../redux/adminSlice";
import { getEditUser } from "../redux/userSlice";
import { DeleteForever } from "@material-ui/icons";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { Button } from "react-bootstrap";
import { Card, CardContent, Wrapper } from "../Styling";
// import { Wrapper } from "../Styling";

export const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.user);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const userDetails = (id) => {
    setShowDetails(true);
    dispatch(getEditUser(id));
  };

  return (
    <Wrapper>
      <h1 className="text-center mb-3">Categories</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody key={user.id}>
            <tr>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <span
                  role="button"
                  className="text-danger font-bold"
                  onClick={() => {
                    dispatch(deleteUser(user.id));
                  }}
                >
                  Delete user
                  <DeleteForever className="icon" />
                </span>
              </td>
              <td>
                <span
                  role="button"
                  className="text-primary font-bold"
                  onClick={() => {
                    userDetails(user.id);
                  }}
                >
                  Show details
                  <SavedSearchIcon className="icon ml-2" />
                </span>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      {showDetails && (
        <Card>
          <div className="card-header bg-info text-white">Person Details</div>
          <CardContent>
            <p>
              <span>Name: </span>
              {user.firstName} {user.lastName}
            </p>
            <p>
              <span>User name: </span>
              {user.userName}
            </p>
            <p>
              <span>Email: </span>
              {user.email}
            </p>
            <p>
              <span>Phone: </span>
              {user.phoneNr}
            </p>
            <Button variant="info" onClick={() => setShowDetails(!showDetails)}>
              Hide
            </Button>
          </CardContent>
        </Card>
      )}
    </Wrapper>
  );
};

export default Users;

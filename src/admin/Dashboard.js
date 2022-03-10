import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { ListGroup } from "react-bootstrap";
import { getCurrentUser, checkUsersRole } from "../redux/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser } = useSelector((state) => state.user);
  const { rolesOfUser } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.user);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(checkUsersRole());
  }, [dispatch]);

  return (
    <>
      {console.log("Roles: ", rolesOfUser)}
      {console.log("token:", token)}
      <div className="d-flex flex-column align-items-start">
        {!token && <h1>You're logged out!</h1>}

        {token && (
          <>
            <h1 className="mb-5">Welcome {currentUser.firstName}!</h1>

            <ListGroup className="w-75">
              <ListGroup.Item>
                <span
                  role="button"
                  className="font-bold"
                  onClick={() => {
                    history.push("/addPost");
                  }}
                >
                  Write a post
                  <DoubleArrowIcon className="icon" />
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span
                  role="button"
                  className="font-bold"
                  onClick={() => {
                    history.push(`/editUser/${currentUser.id}`);
                  }}
                >
                  Edit Profile
                  <DoubleArrowIcon className="icon" />
                </span>
              </ListGroup.Item>
            </ListGroup>
          </>
        )}

        {token && isAuth && (
          <ListGroup className="w-75">
            <ListGroup.Item>
              <span
                role="button"
                className="font-bold"
                onClick={() => {
                  history.push("/manageRoles");
                }}
              >
                Manage Roles
                <DoubleArrowIcon className="icon" />
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span
                role="button"
                className="font-bold"
                onClick={() => {
                  history.push("/categories");
                }}
              >
                Manage Categories
                <DoubleArrowIcon className="icon" />
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span
                role="button"
                className="font-bold"
                onClick={() => {
                  history.push("/users");
                }}
              >
                Manage Users
                <DoubleArrowIcon className="icon" />
              </span>
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
    </>
  );
};

export default Dashboard;

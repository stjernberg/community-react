import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../redux/userSlice";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.user);
  const { rolesOfUser } = useSelector((state) => state.user);
  const { loggedIn } = useSelector((state) => state.user);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      {token && (
        <>
          {console.log(rolesOfUser)}
          <h1>Welcome {currentUser.firstName}!</h1>
        </>
      )}

      {/* {rolesOfUser === "Admin" && ( */}
      <Button variant="info" onClick={() => history.push("/manageRoles")}>
        Manage Roles
      </Button>
      {/* )} */}
      {!token && <h1>You're logged out!</h1>}
    </>
  );
};

export default Dashboard;

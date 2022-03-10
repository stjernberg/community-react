import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { userLogout, checkUsersRole } from "../redux/userSlice";

const Header = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    dispatch(checkUsersRole());
  }, [dispatch]);

  const logoutUser = () => {
    dispatch(userLogout());

    if (!token) {
      history.push("/dashboard");
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        className="navbar-costum  border-bottom box-shadow"
        variant="light"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className=" justify-content-end"
          >
            <Nav>
              <Nav.Link href="/" exact className="nav-color">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/posts">
                Blog posts
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/calendar">
                Calendar
              </Nav.Link>
              {token && isAuth && (
                <Nav.Link as={Link} to="/manageRoles">
                  Manage Roles
                </Nav.Link>
              )}
              {token && (
                <div className="d-flex">
                  <Nav.Link as={Link} to="/addPost">
                    Add post
                  </Nav.Link>
                  <Nav.Link>
                    <PersonIcon className="icon" /> {currentUser.userName}
                  </Nav.Link>
                  <Nav.Link onClick={logoutUser}>
                    <LogoutIcon className="icon" />
                    Logout
                  </Nav.Link>
                </div>
              )}
              {!token && (
                <div className="d-flex">
                  <Nav.Link as={Link} to="/login">
                    <LoginIcon className="icon" />
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/addUser">
                    Register
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { logout } from "../redux/userSlice";

const Header = () => {
  // const token  = useSelector((state) => state.user.token);
  const { rolesOfUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const token = sessionStorage.getItem("token");

  // useEffect(() => {
  //   if (!token) {
  //     history.push("/dashboard");
  //   }
  // }, [history]);

  const logoutUser = () => {
    sessionStorage.removeItem("token");
    dispatch(logout());
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
              <Nav.Link as={Link} to="/postForm">
                Add post
              </Nav.Link>
              <Nav.Link as={Link} to="/posts">
                Blog posts
              </Nav.Link>
              <Nav.Link as={Link} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              {/* {rolesOfUser === "Admin" && ( */}
              <Nav.Link as={Link} to="/manageRoles">
                Manage Roles
              </Nav.Link>
              {/* )} */}

              <Nav.Link as={Link} to="/preferences">
                Preferences
              </Nav.Link>

              {token && <Nav.Link onClick={logoutUser}>Logout</Nav.Link>}
              {!token && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

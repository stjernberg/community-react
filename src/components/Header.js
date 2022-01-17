import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { logout } from "../redux/userSlice";

const Header = () => {
  // const token  = useSelector((state) => state.user.token);
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
              <Nav.Link as={Link} to="/preferences">
                Preferences
              </Nav.Link>
              {!isAuth && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
              {isAuth && (
                <Nav.Link
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
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

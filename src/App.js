import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PostForm from "./components/PostForm";
import Header from "./components/Header";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Categories from "./components/Categories";
import Dashboard from "./admin/Dashboard";
import Preferences from "./admin/Preferences";
import Login from "./admin/Login";
import Register from "./admin/Register";
import ManageRoles from "./admin/ManageRoles";
import { PageWrapper } from "./Styling";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <PageWrapper>
            <Route component={Home} path="/" exact />
            <Route component={PostForm} path="/postForm" />
            <Route component={Posts} path="/posts" />
            <Route component={Categories} path="/categories" />
            <Route component={Dashboard} path="/dashboard" />
            <Route component={Preferences} path="/preferences" />
            <Route component={Register} path="/register" />
            <Route component={ManageRoles} path="/manageRoles" />
            <Route component={Login} path="/login" />
          </PageWrapper>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;

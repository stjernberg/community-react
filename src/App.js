import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components/macro";

import PostForm from "./components/PostForm";
import Header from "./components/Header";
import Home from "./components/Home";
import Posts from "./components/Posts";

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
          </PageWrapper>
        </Switch>
      </BrowserRouter>
    </>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
`;

export default App;

import styled from "styled-components";

//------------Form-styling-------------
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

//------------Post-styling-------------
export const Post = styled.div`
  margin: 50px;
  background: #f5f5f5;
  padding: 15px;
  width: 350px;
  height: 410px;
  border-radius: 2px;
  margin-right: 80px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 10px #707070;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 899px) {
    height: auto;
  }

  @media (max-width: 535px) {
    min-width: 80%;
  }
`;

export const PostsWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

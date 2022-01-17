import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      {isAuth && <h1>Welcome {user.firstName}!</h1>}
      {!isAuth && <h1>You're logged out!</h1>}
    </>
  );
};

export default Dashboard;

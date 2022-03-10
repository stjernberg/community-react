import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { DeleteForever } from "@material-ui/icons";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { deleteRole } from "../redux/adminSlice";

const Roles = ({ name, id }) => {
  // const users = useSelector((state) => state.user.users);
  // const {role} = useSelector((state) => state.admin);
  const { isAuth } = useSelector((state) => state.user);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <tbody>
        <tr>
          <td>{name}</td>

          {token && isAuth && (
            <>
              <td>
                <span
                  role="button"
                  className="text-danger font-bold"
                  onClick={() => {
                    dispatch(deleteRole(id));
                  }}
                >
                  Delete
                  <DeleteForever className="icon" />
                </span>
              </td>

              <td>
                <span
                  role="button"
                  className="text-primary font-bold"
                  onClick={() => {
                    history.push(`/addRoles/${id}`);
                  }}
                >
                  Manage
                  <ManageAccountsIcon className="icon" />
                </span>
              </td>
            </>
          )}
        </tr>
      </tbody>
      
    </>
  );
};

export default Roles;

import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import EbLoader from "./common/Loader/index";
import AxiosServices from "./../networks/AxiosService";
import ApiServices from "./../networks/ApiServices";
import { toast } from "react-toastify";
import RestrictComponent from "./common/RestrictComponent";

const UsersTable = ({ users, onDelete, loading, ...props }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Edit</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Approved</th>
              <th scope="col">Plan</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>
                      <RestrictComponent>
                        <Link to={`/user/${user._id}`}>
                          <FontAwesomeIcon
                            className="text-info"
                            icon={faPencilAlt}
                          />
                        </Link>
                      </RestrictComponent>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        user.isApproved ? (
                          <span className="text-success">Yes</span>
                        ) : (
                          <span className="text-danger">No</span>
                        )
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{user.isAdmin ? "" : user.plan}</td>
                    <td>
                      <RestrictComponent>
                        <button
                          onClick={() => onDelete(user._id, index)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </RestrictComponent>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="text-center m-4">
          {loading && <EbLoader />}
          {loading && "Loading..."}
        </div>
        {users.length < 1 && !loading && (
          <div className="alert alert-danger">
            The table is empty! Why don't you add something via the{" "}
            <Link to="/user">add new user</Link>.
          </div>
        )}
      </div>
    </>
  );
};

export default UsersTable;

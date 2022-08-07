import React from "react";
import ReactImageAppear from "react-image-appear";
import womanAvatar from "../imgs/woman-avatar.png";
import manAvatar from "../imgs/avatar-man.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  return (
    <React.Fragment>
      <nav className="navbar navbar-light navbarstyle bg-light d-flex justify-content-end ">
        <div className="nav-item dropdown mr-4 mt-3">
          <div
            className=" row"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <ReactImageAppear
              src={user.gender === "male" ? manAvatar : womanAvatar}
              className="profileImg"
              placeholderStyle={{
                borderRadius: "100px",
              }}
            />
            <FontAwesomeIcon className="chevron mt-2" icon={faChevronDown} />
            <div className="ml-3">
              <p className="username m-0 p-0">{user.name}</p>
              <p className="job-title">{user.jobTitle}</p>
            </div>
          </div>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <h5 className="dropdown-header pl-3">User:</h5>
            <NavLink to="/profile">
              <button className="dropdown-item navbar-dropdown-items " href="#">
                Profile
              </button>
            </NavLink>
            <NavLink to="/">
              <button className="dropdown-item navbar-dropdown-items " href="#">
                Another action
              </button>
            </NavLink>
            <NavLink to="/">
              <button className="dropdown-item navbar-dropdown-items " href="#">
                Something else here
              </button>
            </NavLink>
            <h5 className="dropdown-header pl-3">Settings:</h5>
            <NavLink to="/profile">
              <button className="dropdown-item navbar-dropdown-items " href="#">
                General settings
              </button>
            </NavLink>
            <NavLink to="/">
              <button className="dropdown-item navbar-dropdown-items " href="#">
                Another action
              </button>
            </NavLink>
            <NavLink to="/">
              <button className="dropdown-item navbar-dropdown-items " href="#">
                Something else here
              </button>
            </NavLink>
            <hr className="m-1" />
            <NavLink to="/logout">
              <button className="dropdown-item navbar-dropdown-items " href="#">
                Logout
              </button>
            </NavLink>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;

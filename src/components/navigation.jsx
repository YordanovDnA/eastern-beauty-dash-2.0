import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faClipboardList,
  faIdBadge,
  faPlus,
  faRocket,
  faSeedling,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReactImageAppear from "react-image-appear";
import logo from "./../imgs/EB-logo.png";
import RestrictComponent from "./common/RestrictComponent";

const Navigation = () => {
  return (
    <React.Fragment>
      <div className="logo-wrapper bg-light p-2 text-center">
        <Link to="/dashboard">
          <ReactImageAppear
            placeholderStyle={{
              backgroundColor: "transperent",
            }}
            src={logo}
          />
        </Link>
      </div>
      <div className="navigation-inner bg-light">
        <h5 className="pl-4 pt-2 pr-4 pb-2 text-light bg-green">Dashborad</h5>
        <ul className="list-group pl-4">
          <li className="list-group-item border-0">
            <Link className="icon-related text-dark" to="/dashboard">
              <FontAwesomeIcon
                style={{ fontSize: 20 }}
                className="icon text-muted mr-2"
                icon={faRocket}
              />
              Home
            </Link>
          </li>
          <li className="list-group-item border-0">
            <Link className="icon-related text-dark" to="/dashboard">
              <FontAwesomeIcon
                style={{ fontSize: 20 }}
                className="icon text-muted mr-2"
                icon={faChartBar}
              />
              Statistics
            </Link>
          </li>
        </ul>
        <h5 className="pl-4 pt-2 pr-4 pb-2 text-light bg-green">Products</h5>
        <ul className="list-group pl-4">
          <li className="list-group-item border-0">
            <Link className="icon-related text-dark" to="/all-products">
              <FontAwesomeIcon
                style={{ fontSize: 20 }}
                className="icon text-muted mr-2"
                icon={faSeedling}
              />
              All products
            </Link>
          </li>
          <li className="list-group-item border-0">
            <Link className="icon-related text-dark" to="/categories/en">
              <FontAwesomeIcon
                style={{ fontSize: 20 }}
                className="icon text-muted mr-2"
                icon={faClipboardList}
              />
              Categories
            </Link>
          </li>
        </ul>
        <h5 className="pl-4 pt-2 pr-4 pb-2 text-light bg-green">Users</h5>
        <ul className="list-group pl-4">
          <RestrictComponent>
            <li className="list-group-item border-0">
              <Link className="icon-related text-dark" to="/users">
                <FontAwesomeIcon
                  style={{ fontSize: 20 }}
                  className="icon text-muted mr-2"
                  icon={faUsers}
                />
                All users
              </Link>
            </li>
            <li className="list-group-item border-0">
              <Link className="icon-related text-dark" to="/user">
                <FontAwesomeIcon
                  style={{ fontSize: 20 }}
                  className="icon text-muted mr-2"
                  icon={faPlus}
                />
                Add new
              </Link>
            </li>
          </RestrictComponent>
          <li className="list-group-item border-0">
            <Link className="icon-related text-dark" to="/profile/id">
              <FontAwesomeIcon
                style={{ fontSize: 20 }}
                className="icon text-muted mr-2"
                icon={faIdBadge}
              />
              My profile
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Navigation;

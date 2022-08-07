import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const HamburgerMenu = ({ setOpen }) => {
  const [pathname, setPath] = useState(window.location.pathname);

  return (
    <React.Fragment>
      <div className="hamburgerMenu text-light">
        <ul>
          <li>
            <NavLink
              onClick={() => {
                setPath("/");
                setOpen(false);
              }}
              to="/"
            >
              <span
                className={
                  pathname === "/" ? "lnr lnr-home active" : "lnr lnr-home"
                }
              ></span>
              <span>Home</span>
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink
              onClick={() => {
                setPath("/aboutMe");
                setOpen(false);
              }}
              to="/aboutMe"
            >
              <span
                className={
                  pathname === "/aboutMe"
                    ? "lnr lnr-user active"
                    : "lnr lnr-user"
                }
              ></span>
              <span>About Me</span>
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink
              onClick={() => {
                setPath("/resume");
                setOpen(false);
              }}
              to="/resume"
            >
              <span
                className={
                  pathname === "/resume"
                    ? "lnr lnr-graduation-hat active"
                    : "lnr lnr-graduation-hat"
                }
              ></span>
              <span>Resume</span>
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink
              onClick={() => {
                setPath("/portfolio");
                setOpen(false);
              }}
              to="/portfolio"
            >
              <span
                className={
                  pathname === "/portfolio"
                    ? "menu-icon lnr lnr-briefcase active"
                    : "menu-icon lnr lnr-briefcase"
                }
              ></span>
              <span>Portfolio</span>
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink
              onClick={() => {
                setPath("/blog");
                setOpen(false);
              }}
              to="/blog"
            >
              <span
                className={
                  pathname === "/blog" ? "lnr lnr-book active" : "lnr lnr-book"
                }
              ></span>
              <span>Blog</span>
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink
              onClick={() => {
                setPath("/contact");
                setOpen(false);
              }}
              to="/contact"
            >
              <span
                className={
                  pathname === "/contact"
                    ? "lnr lnr-envelope active"
                    : "lnr lnr-envelope"
                }
              ></span>
              <span>Contact</span>
            </NavLink>
          </li>
          <hr />
        </ul>
      </div>
    </React.Fragment>
  );
};

export default HamburgerMenu;

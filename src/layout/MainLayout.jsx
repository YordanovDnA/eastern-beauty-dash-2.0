import React, { useState } from "react";
import Navigation from "../components/navigation";
import HamburgerMenu from "../components/hamburgerMenu";
import HamburgerMenuIcon from "../components/hamburgerMenuIcon";
import NavBar from "./../components/navBar";

export default function MainLayout(props) {
  const [open, setOpen] = useState(false);

  let style = {
    display: "none",
  };
  if (open) {
    style.display = "block";
  } else {
    style.display = "none";
  }

  return (
    <>
      <div className="layout-wrapper container-fluid ">
        <div style={style} className="hamburgerMenuWrapper">
          <HamburgerMenu setOpen={setOpen} />
        </div>
        <div className="hamburgerMenuIcon border bg-success">
          <HamburgerMenuIcon
            isOpen={open}
            menuClicked={() => setOpen(!open)}
            width={30}
            height={20}
            strokeWidth={1}
            rotate={0}
            color="white"
            borderRadius={0}
            animationDuration={0.5}
          />
        </div>

        <div className="row">
          <div className="navigation col-sm-2 p-0">
            <Navigation />
          </div>
          <div className="main-section col-sm-10 p-0">
            <div className="row">
              <div className="col-sm-12">
                <NavBar />
              </div>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}

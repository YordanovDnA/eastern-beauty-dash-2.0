import React from "react";
import { Oval } from "react-loader-spinner";
import "./loader-style.scss";
import ReactImageAppear from "react-image-appear";
import logo from "../../../imgs/EB-logo.png";

export default function EbLoader({ message }) {
  return (
    <div className="eb-loader d-flex flex-column justify-content-center">
      <ReactImageAppear
        placeholderStyle={{
          backgroundColor: "transperent",
        }}
        src={logo}
      />
      <Oval
        type="ThreeDots"
        color="#00BFFF"
        height={30}
        width={30}
        visible={true}
      />
    </div>
  );
}

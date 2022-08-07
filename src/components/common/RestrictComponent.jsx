import React from "react";
import ProtectionServices from "../../networks/ProtectionServices";

const RestrictComponent = (props) => {
  const admin = ProtectionServices.checkPermisions();
  return <React.Fragment>{admin && props.children}</React.Fragment>;
};

export default RestrictComponent;

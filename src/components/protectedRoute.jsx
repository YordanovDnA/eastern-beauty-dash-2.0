import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { getToken } from "../utils/index";

const ProtectedRoute = ({ children }) => {
  const auth = getToken();
  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

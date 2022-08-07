import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ReactImageAppear from "react-image-appear";
import logo from "../imgs/EB-logo.png";
import ApiServices from "../networks/ApiServices";
import AxiosServices from "../networks/AxiosService";
import { toast } from "react-toastify";
import { getToken } from "../utils/index";
import EbLoader from "./../components/common/Loader/index";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error("Email or password should be provided");
      setLoading(false);
      return;
    }

    AxiosServices.post(ApiServices.login, { email, password })
      .then((result) => {
        let data = result.data || {};
        let { accessToken, data: user } = data;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userData", JSON.stringify(user));
          window.location.replace("/dashboard");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        let data = (error.response && error.response.data) || {};
        toast.error(data.message);
      });
  };

  const isLoggedIn = getToken();

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <div className="form-wrapper p-4 col-md-6 col-lg-4 mx-auto border shadow rounded bg-light">
            <div className="col-12 d-flex justify-content-center">
              {loading ? (
                <EbLoader />
              ) : (
                <ReactImageAppear
                  placeholderStyle={{
                    backgroundColor: "transperent",
                  }}
                  src={logo}
                />
              )}
            </div>
            {!loading && <h4 className="text-center">Login</h4>}
            <form className="p-4">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Email that you have used while registration.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="checkbox"
                  className="form-check-input"
                  id="remember"
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <button
                disabled={loading}
                onClick={handleLogin}
                type="submit"
                className="btn btn-primary float-right"
              >
                Login
              </button>
              <br />
            </form>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Login;

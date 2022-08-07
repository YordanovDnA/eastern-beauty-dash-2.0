import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import MainLayout from "../layout/MainLayout";
import RestrictComponent from "./common/RestrictComponent";
import ApiServices from "../networks/ApiServices";
import AxiosServices from "../networks/AxiosService";
import { useParams } from "react-router-dom";

const NewUserForm = (props) => {
  const { _id } = useParams();
  const [joiErrors, setJoiErrors] = useState();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    jobTitle: "",
    gender: "male",
    email: "",
    password: "",
    passwordRep: "",
    role: "moderator",
    isApproved: false,
  });

  //Joi validation schema
  const schema = {
    name: Joi.string().min(3).max(30).required().label("Full name"),
    jobTitle: Joi.string().min(3).max(30).required().label("Job title"),
    password: Joi.string().min(5).max(30).required().label("Password"),
    passwordRep: Joi.string().required().label("Repeat password"),
    email: Joi.string().email().max(40).required().label("Email"),
  };

  //Joi validation function
  const validate = () => {
    let { name, jobTitle, password, passwordRep, email } = user;
    const result = Joi.validate(
      {
        name,
        jobTitle,
        password,
        passwordRep,
        email,
      },
      schema,
      {
        abortEarly: false,
      }
    );
    let isPasswordMatched = true;
    const errors = {};

    if (!errors["passwordRep"])
      if (password !== passwordRep) {
        errors["passwordRep"] = "Pasword does't match!";
        isPasswordMatched = false;
      }

    if (result && result.error) {
      for (let item of result.error.details)
        errors[item.path[0]] = item.message;
    }

    return Object.keys(errors).length ? errors : false;
  };

  const handleIsApproved = (event) => {
    let { checked } = event.target;
    setUser({
      ...user,
      isApproved: checked,
    });
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
    setJoiErrors({
      ...joiErrors,
      [name]: "",
    });
  };

  const getUser = async () => {
    setLoading(true);
    try {
      let response = await AxiosServices.get(`${ApiServices.users}/${_id}`);
      let user = response.data.data;
      setUser(user);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setLoading(false);
    }
  };

  const createOrUpdateUser = async () => {
    try {
      let { name, jobTitle, password, email, gender, role, isApproved } = user;

      let response = _id
        ? await AxiosServices.put(`${ApiServices.updateAdmin}/${_id}`, {
            name,
            jobTitle,
            gender,
            role,
            isApproved,
          })
        : await AxiosServices.post(ApiServices.registerAdmin, {
            name,
            jobTitle,
            password,
            email,
            gender,
          });
      let userData = response.data.data;
      let data = response.data;
      toast.success(data.message);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
    }
  };

  //On submit
  const onSubmit = (event) => {
    event.preventDefault();
    let errors;
    if (_id) {
      if (!user.name || (user.name && user.name.length < 3)) {
        setJoiErrors({
          name: "Full name length must be at least 3 characters long",
        });
      }
    } else {
      errors = validate();
      setJoiErrors(errors);
    }
    if (errors) {
      return;
    } else {
      createOrUpdateUser();
      props.history.push("/users");
    }
  };

  useEffect(() => {
    if (_id) getUser();
  }, []);

  useEffect(() => {
    return () => {
      setUser({ ...user });
    };
  }, [_id]);

  return (
    <MainLayout>
      <RestrictComponent>
        <div className="col-10 col-sm-6 col-md-10 col-lg-8 col-xl-6 m-auto pt-4">
          <h2 className="text-center text-green">
            {_id ? "Edit user" : "Add new user"}
          </h2>
          <form className="border shadow rounded bg-light p-4">
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                onChange={handleChange}
                type="name"
                name="name"
                value={user.name}
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Enter your full name"
              />
              {joiErrors && joiErrors.name && (
                <small className="form-text bg-warning p-1 rounded">
                  {joiErrors.name}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="jobTitle">Job title</label>
              <input
                onChange={handleChange}
                type="jobTitle"
                name="jobTitle"
                value={user.jobTitle}
                className="form-control"
                id="jobTitle"
                aria-describedby="jobTitleHelp"
                placeholder="Enter the person job title."
              />
              {joiErrors && joiErrors.jobTitle && (
                <small className="form-text bg-warning p-1 rounded">
                  {joiErrors.jobTitle}
                </small>
              )}
            </div>
            <div className="form-group">
              <label for="gender">Gender</label>
              <select
                onChange={handleChange}
                className="form-control"
                name="gender"
                id="gender"
                defaultValue={user.gender}
              >
                <option value="male">Men</option>
                <option value="female">Women</option>
              </select>
            </div>
            {_id ? (
              <>
                <div className="form-group">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      onChange={handleIsApproved}
                      checked={user.isApproved}
                      class="form-check-input"
                      id="exampleCheck1"
                    />
                    <label class="form-check-label" for="exampleCheck1">
                      IsApproved
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={user.email}
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                  {joiErrors && joiErrors.email && (
                    <small className="form-text bg-warning p-1 rounded">
                      {joiErrors.email}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={user.password}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                  {joiErrors && joiErrors.password && (
                    <small className="form-text bg-warning p-1 rounded">
                      {joiErrors.password}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmpassword">Repeat password</label>
                  <input
                    onChange={handleChange}
                    value={user.passwordRep}
                    type="password"
                    name="passwordRep"
                    className="form-control"
                    id="confirmpassword"
                    placeholder="Password Again"
                  />
                  {joiErrors && joiErrors.passwordRep && (
                    <small className="form-text bg-warning p-1 rounded">
                      {joiErrors.passwordRep}
                    </small>
                  )}
                </div>
              </>
            )}
            <div className="form-group">
              <label for="permisions">Permitions</label>
              <select
                onChange={handleChange}
                className="form-control"
                name="role"
                id="permisions"
              >
                <option
                  defaultValue="moderator"
                  selected={user.role === "moderator" ? true : false}
                >
                  Moderator
                </option>
                <option
                  defaultValue="admin"
                  selected={user.role === "admin" ? true : false}
                >
                  Admin
                </option>
              </select>
            </div>
            <button
              onClick={(event) => onSubmit(event)}
              type="submit"
              className="btn btn-primary float-right"
            >
              {_id ? "Update" : "Register"}
            </button>
            <br />
          </form>
        </div>
      </RestrictComponent>
    </MainLayout>
  );
};

export default NewUserForm;

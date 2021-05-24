import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { getToken, createNewUser } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import chart from './images/chart.png'; // with import
import newOne from './images/new.png'; // with import
import table from './images/table.png'; // with import
import { toast } from "react-toastify";


const Login = ({}) => {
  const history = useHistory();
  const [key, setKey] = useState("login");

  return (
    <div className="bg-light">
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          let data = {
            username: values.username,
            password: values.password,
          };
          if (key === "login") {
            getToken(data)
              .then((res) => {
                localStorage.setItem("token", res.data.auth_token);
                window.location.replace(`/portfolio-home/`);
              })
              .catch((res) => {
                if(res.response.status === 400){
                  toast.error("Incorrect username/password")
                }
              });
          } else {
            createNewUser(data).then(() => {
              getToken(data)
                .then((res) => {
                  localStorage.setItem("token", res.data.auth_token);
                  window.location.replace(`/portfolio-home/`);
                })
                .catch((res) => console.log(res));
            })
            .catch((res)=>{
              if (res.response.data) {
                for (var key in res.response.data) {
                  res.response.data[key].forEach((er) => {
                    toast.error(er)
                  });

                }
              }
            })
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          handleReset,
          /* and other goodies */
        }) => (
          <div className="">
            <div className="d-flex mr-5 ml-5 mt-2">
              <div className="card w-50 mr-5">
                <div class="card-body text-muted d-flex flex-column justify-content-between">
                  <h1>Build Mock Portfolios.</h1>
                  <h1>Test Strategies.</h1>
                  <h1>Simulate Historical Trades.</h1>
                </div>
              </div>
              <div class="card w-50">
                <form
                  className="d-flex w-100 justify-content-center"
                  onSubmit={handleSubmit}
                >
                  <div class="card-body">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key}
                      onSelect={(k) => {
                        handleReset();
                        setKey(k);
                      }}
                      className="mt-3"
                    >
                      <Tab eventKey="login" title="Login">
                        <div className="d-flex flex-column">
                          <input
                            className="form-control mt-2"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          {errors.username &&
                          touched.username &&
                          errors.username ? (
                            <small className="text-danger">
                              {errors.username}
                            </small>
                          ) : null}
                          <input
                            className="form-control mt-2"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {errors.password &&
                          touched.password &&
                          errors.password ? (
                            <small className="text-danger">
                              {errors.password}
                            </small>
                          ) : null}
                          <button
                            onClick={handleSubmit}
                            type="button"
                            class="btn btn-primary mt-2 w-25"
                          >
                            Login
                          </button>
                        </div>
                      </Tab>
                      <Tab eventKey="register" title="Register">
                        <div className="d-flex flex-column">
                          <input
                            className="form-control mt-2"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          {errors.username &&
                          touched.username &&
                          errors.username ? (
                            <small className="text-danger">
                              {errors.username}
                            </small>
                          ) : null}
                          <input
                            className="form-control mt-2"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {errors.password &&
                          touched.password &&
                          errors.password ? (
                            <small className="text-danger">
                              {errors.password}
                            </small>
                          ) : null}
                          <button
                            onClick={handleSubmit}
                            type="button"
                            class="btn btn-primary mt-2 w-25"
                          >
                            Submit
                          </button>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </form>
              </div>
            </div>
            <div className="card mt-3 ml-5 mr-5">
              <div class="card-body text-muted">
                <h4>Analyze</h4>
                <img src={chart} className="w-100 rounded" alt="" />
              </div>
            </div>
            <div className="card mt-3 ml-5 mr-5">
              <div class="card-body text-muted">
              <h4>Monitor</h4>
              <img src={table} className="w-100 rounded" alt="" />
              </div>
            </div>
            <div className="card mt-3 ml-5 mr-5">
              <div class="card-body text-muted">
              <h4>Create</h4>
              <img src={newOne} className="w-100 rounded" alt="" />
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;

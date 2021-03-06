import React, { useState } from "react";
import "./SignUp.css";
import logo from "../../images/logo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, Button, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { CssTextField } from "../CssTextField/CssTextField";
import { Link, useHistory } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import { signup, authenticate } from "../../api/auth/index";
import { performRedirect } from "../RedirectHelper/RedirectHelper";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "40ch",
  },
}));

const initialValues = {
  email: "",
  fullname: "",
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Inavalid email format").required("Required"),
  fullname: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(6, "Min 6 character required")
    .required("Required"),
});

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    setProcessing(true);
    signup(values)
      .then((data) => {
        if (data.error) {
          setProcessing(false);
          setError(data.error);
          setSubmitting(false);
        } else {
          authenticate(data, () => {
            setProcessing(false);
            setError("");
            resetForm();
            history.push("/");
          });
        }
      })
      .catch((error) => setError("ERROR IN SIGNUP"));
  };
  return (
    <div className="signUp">
      {performRedirect()}
      <Card className="signUp__card">
        <div className="signUp__logoContainer">
          <img src={logo} alt="logo" className="signUp__logo" />
        </div>
        <CardContent>
          <h2 className="signUp__text">
            Sign up to see photos and videos from your friends.
          </h2>
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            startIcon={<FacebookIcon />}
            disabled={true}
          >
            Login with facebook
          </Button>
          <div className="signup__divider">
            <h4 className="signup__dividerText">
              <span>OR</span>
            </h4>
          </div>
          {error && (
            <div className="signUp__alert">
              <Alert severity="error">{error}</Alert>
            </div>
          )}
          <div className="signUp__form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <CssTextField
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      error={errors.email && touched.email}
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.email && touched.email && errors.email}
                    />
                    <br />
                    <br />
                    <CssTextField
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      error={errors.fullname && touched.fullname}
                      label="Full Name"
                      name="fullname"
                      value={values.fullname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.fullname && touched.fullname && errors.fullname
                      }
                    />
                    <br />
                    <br />
                    <CssTextField
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      error={errors.username && touched.username}
                      label="UserName"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.username && touched.username && errors.username
                      }
                    />
                    <br />
                    <br />
                    <CssTextField
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      error={errors.password && touched.password}
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                    />
                    <br />
                    <br />
                    <Button
                      startIcon={processing && <CircularProgress size="20px" />}
                      type="submit"
                      fullWidth={true}
                      disabled={isSubmitting || processing}
                      variant="contained"
                    >
                      Sign up
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </div>
          <p className="signUp__p">
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
          <div className="signUp__signinLink">
            <p>
              Have an account?{" "}
              <Link to="/signin" className="signUp__link">
                Log in
              </Link>{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;

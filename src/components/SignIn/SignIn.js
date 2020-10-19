import React from "react";
import "./SignIn.css";
import mockup from "../../images/UI.png";
import logo from "../../images/logo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, Button, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CssTextField } from "../CssTextField/CssTextField";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "40ch",
  },
}));

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Inavalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Min 6 character required")
    .required("Required"),
});

function SignIn() {
  const classes = useStyles();
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };
  return (
    <div className="signIn">
      <div className="signIn__container">
        <img src={mockup} height="600" width="auto" alt="instagram" />
        <div className="signIn__right">
          <Card className="signIn__card">
            <div className="signIn__logoContainer">
              <img src={logo} alt="logo" className="signIn__logo" />
            </div>
            <CardContent>
              <div className="signIn__form">
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
                          helperText={
                            errors.email && touched.email && errors.email
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
                            errors.password &&
                            touched.password &&
                            errors.password
                          }
                        />
                        <br />
                        <br />
                        <Button
                          type="submit"
                          fullWidth={true}
                          disabled={isSubmitting}
                          variant="contained"
                        >
                          Sign in
                        </Button>
                      </form>
                    );
                  }}
                </Formik>
              </div>
              <div className="signin__divider">
                <h4>
                  <span>OR</span>
                </h4>
              </div>
              <div className="signIn__footer">
                <div className="signIn__fblogin">
                  <FacebookIcon /> Log in with Facebook
                </div>
                <p>Forgot password?</p>
              </div>
            </CardContent>
          </Card>
          <Card className="signIn__linkCard">
            <CardContent>
              <p>
                Don't have an account?
                <Link to="/signup" className="signIn__link">
                  Sign Up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

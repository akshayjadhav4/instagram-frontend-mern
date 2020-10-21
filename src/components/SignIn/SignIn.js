import React, { useState } from "react";
import "./SignIn.css";
import mockup from "../../images/UI.png";
import logo from "../../images/logo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, Button, CardContent, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { CssTextField } from "../CssTextField/CssTextField";
import { Link, useHistory } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import { signin, authenticate } from "../../api/auth/index";
import { performRedirect } from "../RedirectHelper/RedirectHelper";
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
  const history = useHistory();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    setProcessing(true);
    signin(values)
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
    <div className="signIn">
      {performRedirect()}
      <div className="signIn__container">
        <img src={mockup} height="600" width="auto" alt="instagram" />
        <div className="signIn__right">
          <Card className="signIn__card">
            <div className="signIn__logoContainer">
              <img src={logo} alt="logo" className="signIn__logo" />
            </div>
            <CardContent>
              {error && (
                <div className="signIn__alert">
                  <Alert severity="error">{error}</Alert>
                </div>
              )}
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
                          startIcon={
                            processing && <CircularProgress size="20px" />
                          }
                          fullWidth={true}
                          disabled={isSubmitting || processing}
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
                <h4 className="signin__dividerText">
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

import React, { useState } from "react";
import "./EditProfile.css";
import Base from "../Base/Base";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  Button,
  CircularProgress,
  Avatar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { CssTextField } from "../CssTextField/CssTextField";
import profilePhoto from "../../images/user.png";
import { isAuthenticated } from "../../api/auth";
import { updateUser } from "../../api/user/userApiCalls";

const validationSchema = Yup.object({
  email: Yup.string().email("Inavalid email format").required("Required"),
  fullname: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  bio: Yup.string().required("Required"),
});

function EditProfile() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, token } = isAuthenticated();

  const initialValues = {
    email: user?.email,
    fullname: user?.fullname,
    username: user?.username,
    bio: "",
  };

  const onSubmit = (values, { setSubmitting }) => {
    setProcessing(true);
    updateUser(user._id, token, values)
      .then((data) => {
        if (data.error) {
          setProcessing(false);
          setError(data.error);
          setSubmitting(false);
        } else {
          setProcessing(false);
          setError("");
          setSuccess("Profile Updated");
          setSubmitting(false);
        }
      })
      .catch((error) => {
        setProcessing(false);
        setSubmitting(false);
        setError("ERROR WHILE UPDATING PROFILE");
      });
  };

  return (
    <Base>
      <div className="editProfile">
        <Card className="editProfile__card">
          <CardContent className="editProfile__cardContainer">
            {/* This side bar is only for UI purpose */}
            <div className="editProfile__option">
              <h3>Edit Profile</h3>
              <h3>Change Passowrd</h3>
              <h3>Apps and Website</h3>
              <h3>Email and SMS</h3>
              <h3>Push Notifications</h3>
              <h3>Manage Contacts</h3>
              <h3>Privacy and Security</h3>
              <h3>Login Activity</h3>
              <h3>EMails from Instagram</h3>
            </div>
            <div className="editProfile__from">
              <div className="editProfile__info">
                <Avatar src={profilePhoto} className="editProfile__avtar" />
                <h2>{user?.username}</h2>
              </div>
              {error && (
                <div className="editProfile__alert">
                  <Alert severity="error">{error}</Alert>
                </div>
              )}
              {success && (
                <div className="editProfile__alert">
                  <Alert severity="success">{success}</Alert>
                </div>
              )}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
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
                        fullWidth
                        error={errors.fullname && touched.fullname}
                        label="Name"
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
                        fullWidth
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
                        fullWidth
                        error={errors.username && touched.username}
                        label="Username"
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
                        fullWidth
                        multiline
                        error={errors.bio && touched.bio}
                        label="Bio"
                        name="bio"
                        value={values.bio}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.bio && touched.bio && errors.bio}
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
                        Save
                      </Button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </CardContent>
        </Card>
      </div>
      ;
    </Base>
  );
}

export default EditProfile;

import React, { useState } from "react";
import "./AddPost.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { IconButton, CircularProgress, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CssTextField } from "../CssTextField/CssTextField";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link, useHistory } from "react-router-dom";
import { createPost } from "../../api/posts/postsApiCalls";
import { isAuthenticated } from "../../api/auth";

const initialValues = {
  photo: null,
  description: "",
  location: "",
};

const validationSchema = Yup.object({
  photo: Yup.mixed().required("Image Required"),
  description: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
});

function AddPost() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();
  const { user, token } = isAuthenticated();

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    setProcessing(true);
    // using FormData because we need to send image
    let formData = new FormData();
    formData.append("photo", values.photo);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("author", user._id);
    createPost(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setProcessing(false);
          setError(data.error);
          setSubmitting(false);
        } else {
          setProcessing(false);
          setError("");
          setSubmitting(false);
          resetForm();
          history.push("/profile");
        }
      })
      .catch((error) => {
        setProcessing(false);
        setSubmitting(false);
        setError("ERROR WHILE POSTING");
      });
  };

  return (
    <div className="addPost">
      <div className="addPost__header">
        <Link to="/profile">
          <IconButton>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Link>
        <h2>Add Post</h2>
      </div>
      {error && (
        <div className="addPost__alert">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
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
            setFieldValue,
          } = props;
          return (
            <div className="addPost__form">
              <form onSubmit={handleSubmit}>
                <div className="addProduct__imageUpload">
                  <label>
                    <input
                      type="file"
                      name="photo"
                      accept="image"
                      placeholder="choose a Image"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        setFieldValue("photo", event.currentTarget.files[0]);
                      }}
                    />
                  </label>
                  <span style={{ color: "red" }}>
                    {touched?.photo && errors?.photo}
                  </span>
                </div>
                <br />
                <CssTextField
                  variant="outlined"
                  fullWidth
                  multiline
                  error={errors.description && touched.description}
                  label="Caption"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                />
                <br />
                <br />
                <CssTextField
                  variant="outlined"
                  fullWidth
                  error={errors.location && touched.location}
                  label="Location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.location && touched.location && errors.location
                  }
                />
                <br />
                <br />
                <Button
                  type="submit"
                  startIcon={processing && <CircularProgress size="20px" />}
                  fullWidth={true}
                  disabled={isSubmitting || processing}
                  variant="contained"
                >
                  POST
                </Button>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddPost;

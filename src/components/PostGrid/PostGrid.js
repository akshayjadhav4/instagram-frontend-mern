import React, { useState } from "react";
import ImageHelper from "./ImageHelper";
import { Grid, Card, CardContent, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ViewPost from "../ViewPost/ViewPost";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: "100%",
  },
}));

function PostGrid({ posts }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const [maxWidth] = useState("lg");
  const [fullWidth] = useState(true);

  const handleClickOpen = (post) => {
    setOpen(true);
    setPost(post);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div className="postGrid">
      <Grid container spacing={3}>
        {posts &&
          posts.map((post) => (
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              key={post._id}
              onClick={() => {
                handleClickOpen(post);
              }}
            >
              <Card className={classes.root} style={{ cursor: "pointer" }}>
                <CardContent>
                  <ImageHelper post={post} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <ViewPost post={post} />
        </Dialog>
      </Grid>
    </div>
  );
}

export default PostGrid;

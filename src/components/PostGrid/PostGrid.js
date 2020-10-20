import React from "react";
import ImageHelper from "./ImageHelper";
import { Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

function PostGrid({ posts }) {
  const classes = useStyles();

  return (
    <div className="postGrid">
      <Grid container spacing={3}>
        {posts &&
          posts.map((post) => (
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card className={classes.root}>
                <CardContent>
                  <ImageHelper post={post} />
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default PostGrid;

import React, { useState, useEffect } from "react";
import Base from "../Base/Base";
import ImageHelper from "../PostGrid/ImageHelper";
import { Grid, Card, CardContent, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { isAuthenticated } from "../../api/auth";
import { getAllPostsExplore } from "../../api/posts/postsApiCalls";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    height: "100%",
  },
}));

function Explore() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    const loadPosts = () => {
      setIsLoading(true);
      getAllPostsExplore(user._id, token)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setIsLoading(false);
          } else {
            setPosts(data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError("ERROR WHILE GETTING POSTS FOR EXPLORE.");
        });
    };
    loadPosts();
  }, [user._id, token]);

  return (
    <Base>
      <div
        className="explore"
        style={{ display: "grid", placeItems: "center" }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        {isLoading ? (
          <CircularProgress style={{ color: "lightgray" }} />
        ) : (
          <Grid container spacing={2}>
            {posts &&
              posts.map((post) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  key={post._id}
                  style={{ cursor: "pointer" }}
                >
                  <Card className={classes.root}>
                    <CardContent>
                      <ImageHelper post={post} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      </div>
      ;
    </Base>
  );
}

export default Explore;

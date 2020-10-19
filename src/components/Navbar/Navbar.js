import React, { useLayoutEffect, useState } from "react";
import "./Navbar.css";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Grid,
  SwipeableDrawer,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import TelegramIcon from "@material-ui/icons/Telegram";
import ExploreIcon from "@material-ui/icons/Explore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from "../../images/logo.png";
const useStyles = makeStyles({
  list: {
    width: 200,
  },

  sideBarIcon: {
    padding: 0,
    color: "black",
    cursor: "pointer",
  },
});

function Navbar({ history }) {
  const classes = useStyles();

  const [drawer, setDrawer] = useState(false);
  const [activateDrawer, setActivateDrawer] = useState(false);

  //   calculating screen size
  useLayoutEffect(() => {
    if (window.innerWidth <= 600) {
      setActivateDrawer(true);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 600) {
        setActivateDrawer(true);
      } else {
        setActivateDrawer(false);
      }
    });
  }, []);

  const CreateDrawer = () => {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <MenuIcon
                className={classes.sideBarIcon}
                onClick={() => {
                  setDrawer(true);
                }}
              />
              <Typography
                color="inherit"
                variant="headline"
                className="navbar__Logo"
              >
                <Link to="/" className="navbar__link">
                  <img
                    src={logo}
                    className="responsive-img"
                    width="150"
                    height="auto"
                    alt=""
                  />
                </Link>
              </Typography>
              <Typography color="inherit" variant="headline"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={drawer}
          onClose={() => {
            setDrawer(false);
          }}
          onOpen={() => {
            setDrawer(true);
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              setDrawer(false);
            }}
            onKeyDown={() => {
              setDrawer(false);
            }}
          >
            <List className={classes.list}>
              <ListItem key={0} button divider>
                <Link to="/">
                  <IconButton>
                    <HomeIcon
                      className={`navbar__link ${
                        history.location.pathname === "/" &&
                        "navbar__link--active"
                      }`}
                    />
                  </IconButton>
                </Link>
              </ListItem>
              <ListItem key={1} button divider>
                <Link to="/messages">
                  <IconButton>
                    <TelegramIcon
                      className={`navbar__link ${
                        history.location.pathname === "/messages" &&
                        "navbar__link--active"
                      }`}
                    />
                  </IconButton>
                </Link>
              </ListItem>
              <ListItem key={2} button divider>
                <Link to="/explore">
                  <IconButton>
                    <ExploreIcon
                      className={`navbar__link ${
                        history.location.pathname === "/explore" &&
                        "navbar__link--active"
                      }`}
                    />
                  </IconButton>
                </Link>
              </ListItem>
              <ListItem key={3} button divider>
                <Link to="/profile">
                  <IconButton>
                    <AccountCircleIcon
                      className={`navbar__link ${
                        history.location.pathname === "/profile" &&
                        "navbar__link--active"
                      }`}
                    />
                  </IconButton>
                </Link>
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
      </div>
    );
  };

  const CreateAppbar = () => {
    return (
      <AppBar>
        <Toolbar>
          <Typography
            variant="headline"
            style={{ flexGrow: 1 }}
            color="inherit"
            className="navbar__Logo"
          >
            <Link to="/" className="navbar__link">
              <img
                src={logo}
                className="responsive-img"
                width="150"
                height="auto"
                alt=""
              />
            </Link>
          </Typography>
          <Link to="/">
            <IconButton>
              <HomeIcon
                className={`navbar__link ${
                  history.location.pathname === "/" && "navbar__link--active"
                }`}
              />
            </IconButton>
          </Link>
          <Link to="/messages">
            <IconButton>
              <TelegramIcon
                className={`navbar__link ${
                  history.location.pathname === "/messages" &&
                  "navbar__link--active"
                }`}
              />
            </IconButton>
          </Link>
          <Link to="/explore">
            <IconButton>
              <ExploreIcon
                className={`navbar__link ${
                  history.location.pathname === "/explore" &&
                  "navbar__link--active"
                }`}
              />
            </IconButton>
          </Link>
          <Link to="/profile">
            <IconButton>
              <AccountCircleIcon
                className={`navbar__link ${
                  history.location.pathname === "/profile" &&
                  "navbar__link--active"
                }`}
              />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    );
  };
  return activateDrawer ? CreateDrawer() : CreateAppbar();
}

export default withRouter(Navbar);

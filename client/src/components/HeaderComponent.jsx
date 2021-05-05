import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Hidden, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";
import TextsmsIcon from "@material-ui/icons/Textsms";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import SecurityIcon from "@material-ui/icons/Security";
import { purple } from "@material-ui/core/colors";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  buttonStyle: {
    textTransform: "capitalize",
    color: purple[500],
  },
}));

function HeaderComponent() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    axios
      .post("/auth/logout", { token: localStorage.getItem("token"), email: localStorage.getItem("email") })
      .then((res) => {
        if (res.data.status === "ok") {
          localStorage.clear();
          history.push("/login");
          window.location.reload();
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Hidden lgUp>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography variant="h6" className={classes.title}>
            Secure Mail Box
          </Typography>

          <Hidden mdDown>
            {localStorage.getItem("token") && localStorage.getItem("role") === "user" ? (
              <>
                <Box px={1}>
                  <Link to="/mails">
                    <Button color="inherit" startIcon={<MailIcon />} className={classes.buttonStyle}>
                      Mail
                    </Button>
                  </Link>
                </Box>

                <Box px={1}>
                  <Link to="/live-chat">
                    <Button color="inherit" startIcon={<TextsmsIcon />} className={classes.buttonStyle}>
                      Live Chat
                    </Button>
                  </Link>
                </Box>

                <Box px={1}>
                  <Link to="/secure-file">
                    <Button color="inherit" startIcon={<SecurityIcon />} className={classes.buttonStyle}>
                      Encryption/ Decryption
                    </Button>
                  </Link>
                </Box>

                <Box px={1}>
                  <Link to="/notification-list">
                    <Button color="inherit" startIcon={<NotificationsIcon />} className={classes.buttonStyle}>
                      Notifications
                    </Button>
                  </Link>
                </Box>

                <Box px={1}>
                  <Button color="inherit" className={classes.buttonStyle} onClick={logout} disabled={loading}>
                    Logout as {localStorage.getItem("name")}
                  </Button>
                </Box>
              </>
            ) : localStorage.getItem("token") && localStorage.getItem("role") === "admin" ? (
              <>
                <Box px={1}>
                  <Link to="/user-list">
                    <Button color="inherit" startIcon={<PeopleIcon />} className={classes.buttonStyle}>
                      User List
                    </Button>
                  </Link>
                </Box>

                <Box px={1}>
                  <Link to="/create-notification">
                    <Button color="inherit" startIcon={<AddAlertIcon />} className={classes.buttonStyle}>
                      Create Notification
                    </Button>
                  </Link>
                </Box>

                <Box px={1}>
                  <Link to="/notification-list">
                    <Button color="inherit" startIcon={<NotificationsIcon />} className={classes.buttonStyle}>
                      Notifications
                    </Button>
                  </Link>
                </Box>

                <Box px={1}>
                  <Button color="inherit" className={classes.buttonStyle} onClick={logout} disabled={loading}>
                    Logout as {localStorage.getItem("name")}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box px={1}>
                  <Link to="/login">
                    <Button color="inherit" className={classes.buttonStyle}>
                      Login
                    </Button>
                  </Link>
                </Box>

                <Box px={1}>
                  <Link to="/register">
                    <Button color="inherit" className={classes.buttonStyle}>
                      Register
                    </Button>
                  </Link>
                </Box>
              </>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderComponent;

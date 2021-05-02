import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import TextsmsIcon from "@material-ui/icons/Textsms";
import SecurityIcon from "@material-ui/icons/Security";
import { Link, useHistory } from "react-router-dom";

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
  },
}));

function HeaderComponent() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" className={classes.title}>
            Secure Mail Box
          </Typography>

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
            <Link to="/create-notification">
              <Button color="inherit" startIcon={<AddAlertIcon />} className={classes.buttonStyle}>
                Create Notification
              </Button>
            </Link>
          </Box>

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

          <Box px={1}>
            <Button color="inherit" className={classes.buttonStyle}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderComponent;

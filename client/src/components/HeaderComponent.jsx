import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import TextsmsIcon from "@material-ui/icons/Textsms";
import SecurityIcon from "@material-ui/icons/Security";
import MenuIcon from "@material-ui/icons/Menu";
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

          <Link to="/mails">
            <Button color="inherit" startIcon={<MailIcon />}>
              Mail
            </Button>
          </Link>

          <Link to="/live-chat">
            <Button color="inherit" startIcon={<TextsmsIcon />}>
              Live Chat
            </Button>
          </Link>
          <Link to="/secure-file">
            <Button color="inherit" startIcon={<SecurityIcon />}>
              Encryption/Decryption
            </Button>
          </Link>
          <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register">
            <Button color="inherit">Register</Button>
          </Link>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderComponent;

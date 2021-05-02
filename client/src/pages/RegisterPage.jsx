import React, { useState } from "react";
import { Avatar, Grid, Typography, Container, Checkbox, CssBaseline, TextField, Button, FormControlLabel } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { deepPurple } from "@material-ui/core/colors";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../components/Notification";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: deepPurple[700],
    "&:hover": {
      backgroundColor: deepPurple[900],
    },
  },
  inputStyle: {
    color: deepPurple[400],
  },
}));

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  // STATES

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = signUpForm;

  // METHODS
  const handleValidation = () => {
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      return false;
    } else if (password !== confirmPassword) {
      return "pass";
    } else {
      return true;
    }
  };
  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation() === false) {
      Notification("Warning", "All fields are required", "warning");
    } else if (handleValidation() === "pass") {
      Notification("Warning", "Password fields didn't match", "warning");
    } else {
      const information = {
        name: name,
        email: email,
        password: password,
      };
      axios
        .post("/api/v1/auth/signup", information)
        .then((res) => {
          console.log(res.data.data);
          const userId = res.data.data._id;
          const name = res.data.data.name;
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              userId,
              name,
            })
          );
          history.push("/profile");
          window.location.reload();
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField autoComplete="name" name="name" value={name} onChange={handleChange} variant="outlined" required fullWidth id="name" label="First Name" autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth id="email" label="Email Address" name="email" value={email} onChange={handleChange} autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                className={classes.inputStyle}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

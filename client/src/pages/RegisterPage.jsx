import React, { useState } from "react";
import { Avatar, Grid, Typography, Container, CssBaseline, TextField, Button, CircularProgress } from "@material-ui/core";
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
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  // STATES
  const [loading, setLoading] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = signUpForm;

  // METHODS
  const handleValidation = () => {
    const validEmail = /.+@.+\..+/.test(email);

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      return Notification("Warning", "All fields are required", "warning");
    } else if (password !== confirmPassword) {
      return Notification("Warning", "Password didn't match!", "warning");
    } else if (!validEmail) {
      return Notification("Warning", "Invalid email!", "warning");
    } else {
      return true;
    }
  };
  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidation()) {
      const information = {
        fullName: name,
        email: email,
        password: password,
        role: "User",
      };
      console.log(information);
      axios
        .post("/auth/signup", information)
        .then((res) => {
          console.log(res);
          Notification("Congratulations", "Your account is created successfully", "success");
          history.push("/login");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));

      // axios
      //   .post("/auth/signup", information)
      //   .then((res) => {
      //     console.log(res);
      //     Notification("Congratulations", "Your account is created successfully", "success");
      //     history.push("/login");
      //   })
      //   .catch((err) => {
      //     if (err.response.data.message) {
      //       Notification("Error", `${err.response.data.message}`, "error");
      //     } else {
      //       Notification("Error", "Something went wrong. Please check your internet connection", "error");
      //     }
      //   });
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
          <div className={classes.wrapper}>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading}>
              Sign Up
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

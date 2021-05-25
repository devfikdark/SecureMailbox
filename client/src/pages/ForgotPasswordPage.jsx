import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../components/Notification";
import { Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function ForgotPasswordPage() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      console.log("not password");
      setIsVerified(true);
    } else {
      console.log("password");
    }
  };

  return (
    <div>
      <Container maxWidth="xs" component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            Forgot Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth variant="outlined" value={email} label="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel required variant="outlined">
                    Select a question
                  </InputLabel>
                  <Select variant="outlined" value={question} onChange={(e) => setQuestion(e.target.value)} label="Select a question">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {/* {areaLocation.map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </Grid>
              {isVerified && (
                <>
                  <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="New Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Confirm New Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </Grid>
                </>
              )}
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading}>
                Verify yourself
              </Button>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPasswordPage;

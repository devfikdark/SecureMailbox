import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import Notification from "../components/Notification";

function CreateNotificationPage() {
  const [notification, setNotification] = useState({ title: "", details: "" });
  const { title, details } = notification;

  const handleChange = (e) => {
    setNotification({ ...notification, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    if (title === "" || details === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      Notification("Warning", "All fields are require!", "warning");
    } else {
      console.log(title);
      console.log(details);
    }
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center" my={5}>
        <Typography variant="h5">Create Notification</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Notification Title" name="title" value={title} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Details" name="details" value={details} onChange={handleChange} fullWidth multiline rows={4} />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Create Notification
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default CreateNotificationPage;

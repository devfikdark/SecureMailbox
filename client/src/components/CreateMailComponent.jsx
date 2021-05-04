import React, { useState } from "react";
import { Box, Button, Card, CardContent, Container, Divider, Grid, List, ListItem, ListItemText, Paper, TextField, Typography } from "@material-ui/core";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Notification from "./Notification";
import axios from "axios";

function CreateMailComponent() {
  const [mailInformation, setMailInformation] = useState({
    mailSubject: "",
    message: "",
    mailTo: "",
  });
  const [file, setFile] = useState({ selectedFile: "", filePath: "", fileName: "" });
  const [loading, setLoading] = useState(false);

  const { selectedFile, filePath, fileName } = file;
  const { mailSubject, message, mailTo } = mailInformation;

  const handleChange = (e) => setMailInformation({ ...mailInformation, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setFile({ selectedFile: e.target.files[0], fileName: e.target.files[0].name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // uploading file to cloudinary server
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };

    fetch("https://api.Cloudinary.com/v1_1/dck5ccwjv/raw/upload", options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFile({ filePath: res.url });
      })
      .catch((err) => console.log(err));

    const mailFrom = localStorage.getItem("email");

    axios
      .post(
        "/emails",
        { subject: mailSubject, message: message, filePath: filePath, from: mailFrom, to: mailTo },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "ok") {
          Notification("Success", "Mail sent successfully", "success");
        } else {
          Notification("Error", `${res.data.message}`, "error");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" style={{ borderRadius: 10 }}>
              <CardContent>
                <Box display="flex" justifyContent="center">
                  <Typography variant="h6">User Emails</Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemText primary="haha" />
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <form onSubmit={handleSubmit}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <TextField variant="outlined" label="To" name="mailTo" value={mailTo} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <TextField variant="outlined" label="Subject" name="mailSubject" value={mailSubject} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <TextField variant="outlined" label="Message" name="message" value={message} rows={4} multiline onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Button variant="contained" component="label" startIcon={<AttachmentIcon />} style={{ marginRight: 1 }}>
                  Select File
                  <input type="file" hidden name="encryptFile" onChange={handleFileChange} />
                </Button>
                {fileName}
              </Grid>

              <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
                Send
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CreateMailComponent;

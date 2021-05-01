import React, { useState } from "react";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../components/Notification";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  fileInput: {
    padding: "20px",
    border: "none",
    outlined: "none",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fileButton: {
    marginRight: "1em",
  },
}));

function EncryptionComponent() {
  const [encryptionKey, setEncryptionKey] = useState("");
  const [file, setFile] = useState({ filePath: "", fileName: "" });
  const { filePath, fileName } = file;
  const classes = useStyles();

  const handleValidation = () => {
    if (file.fileName === "" || encryptionKey === "") {
      return false;
    } else {
      return true;
    }
  };
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile({ filePath: selectedFile, fileName: selectedFile.name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      Notification("Warning", "All fields are required!", "warning");
    } else {
      console.log(encryptionKey);
      console.log(filePath);
      //   axios.post('http://localhost:5000/encrypt-file', {file: filePath, key: encryptionKey});
    }
    console.log(e);
  };
  return (
    <div>
      <Container maxWidth="md">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" component="label" startIcon={<AttachmentIcon />} className={classes.fileButton}>
                File Input
                <input type="file" hidden name="encryptFile" onChange={handleChange} />
              </Button>
              {fileName}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Enter encryption key" type="text" value={encryptionKey} variant="outlined" fullWidth onChange={(e) => setEncryptionKey(e.target.value)} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Encrypt file
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default EncryptionComponent;

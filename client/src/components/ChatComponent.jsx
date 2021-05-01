import React from "react";
import { Box, Card, CardContent, IconButton, TextField, Typography } from "@material-ui/core";
import { deepPurple, blue } from "@material-ui/core/colors";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messages: {
    height: "57vh",
    backgroundColor: "",
  },
  receivedMessage: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: deepPurple[50],
  },
  sentMessage: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: blue[50],
  },
  card: {
    position: "relative",
  },
  messageField: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "38em",
  },
  messageButton: {
    position: "absolute",
    bottom: 8,
    right: 10,
  },
}));

function ChatComponent() {
  const classes = useStyles();
  return (
    <div>
      <Card style={{ height: "70vh" }} className={classes.card}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={4}>
            <Typography>Username</Typography>
          </Box>
          <Box className={classes.messages}>
            <Box display="flex" justifyContent="flex-start" className={classes.receivedMessage} mb={1}>
              hello there, how are you? hello there, how are you? hello there, how are you? hello there, how are you? hello there, how are you? hello there, how are you? hello there, how are you?
              hello there, how are you?
            </Box>
            <Box display="flex" justifyContent="flex-end" className={classes.sentMessage} mb={1}>
              I am fine. how is it going?
            </Box>
          </Box>
          <TextField variant="outlined" placeholder="Type your message" className={classes.messageField} />
          <IconButton className={classes.messageButton} color="secondary">
            <SendIcon />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatComponent;

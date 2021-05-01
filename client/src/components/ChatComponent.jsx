import React from "react";
import { Box, Card, CardContent, IconButton, TextField, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
  },
  messageField: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "31vw",
  },
  messageButton: {
    position: "absolute",
    bottom: 8,
    right: 10,
  },
  messages: {
    height: "57vh",
    backgroundColor: "purple",
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
            <Box display="flex" justifyContent="start">
              lsldkfjlksdfj
            </Box>
            <Box display="flex" justifyContent="end">
              lsldkfjlksdfj
            </Box>
          </Box>
          <TextField variant="outlined" placeholder="Type your message" className={classes.messageField} />
          <IconButton className={classes.messageButton} size="large" color="secondary">
            <SendIcon />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatComponent;

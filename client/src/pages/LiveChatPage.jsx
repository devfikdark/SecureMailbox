import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  Avatar,
  List,
  ListItem,
  Badge,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import { deepPurple, blue } from "@material-ui/core/colors";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import app from "../utils/features";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  messages: {
    height: "56vh",
    overflow: "auto",
    backgroundColor: "",
  },
  sent: {
    display: "flex",
    justifyContent: "flex-end",
  },
  received: {
    display: "flex",
    justifyContent: "flex-start",
  },
  receivedMessage: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: deepPurple[50],
    width: "20em",
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

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

function LiveChatPage() {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          const currentUser = localStorage.getItem("email");
          const filteredUsers = res.data.data.filter((el) => el.role !== "admin" && el.email !== currentUser);
          setUsers([...filteredUsers].reverse());
        } else {
          Notification("Error", `${res.data.message}`, "error");
        }
      })
      .catch(() => Notification("Error", "Your session has expired. Please login again", "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleListItemClick = async (email) => {
    setSelectedUser(email);
    await fetchData(email);
    await app.service("chats").on("created", fetchData);
  };

  const fetchData = async (response) => {
    try {
      let toEmail;
      if (response.data) {
        toEmail = response.data.to;
      } else {
        toEmail = response;
      }

      if (localStorage.getItem("email") === toEmail) {
        toEmail = response.data.from;
      }

      const chatInfo = await app.service("chats").find({
        query: {
          from: localStorage.getItem("email"),
          to: toEmail,
        },
      });

      const resData = [];
      chatInfo.data.map((el) =>
        resData.push({
          key: el._id,
          message: el.message,
          type: el.type,
        })
      );
      setData(resData);
    } catch (error) {}
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const body = {
      message,
      from: localStorage.getItem("email"),
      to: selectedUser,
    };
    await app.service("chats").create(body);
    setMessage("");
  };

  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: "3em" }}>
        <CssBaseline />
        <Grid container spacing={2}>
          {/* Chat list users */}
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" justifyContent="center">
                  <Typography variant="h6">Chat List</Typography>
                </Box>
                <List style={{ maxHeight: "50vh", overflow: "auto" }}>
                  {loading ? (
                    <Box display="flex" justifyContent="center">
                      <CircularProgress />
                    </Box>
                  ) : (
                    <>
                      {users.map((el) => (
                        <>
                          {el.status ? (
                            <ListItem button key={el._id} onClick={() => handleListItemClick(el.email)}>
                              <ListItemAvatar>
                                <StyledBadge
                                  overlap="circle"
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  variant="dot">
                                  <Avatar />
                                </StyledBadge>
                              </ListItemAvatar>
                              <ListItemText primary={el.fullName} />
                            </ListItem>
                          ) : (
                            <ListItem button key={el._id} onClick={() => handleListItemClick(el.email)}>
                              <ListItemAvatar>
                                <Avatar />
                              </ListItemAvatar>
                              <ListItemText primary={el.fullName} />
                            </ListItem>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          {/* Chat messages */}
          <Grid item xs={12} sm={8}>
            <Card style={{ height: "70vh" }} className={classes.card}>
              <CardContent>
                <Box display="flex" justifyContent="center" mb={4}>
                  <Typography>Username</Typography>
                </Box>
                <Box className={classes.messages}>
                  {data.map((el) => (
                    <div className={el.type === "Send" ? classes.sent : classes.received}>
                      <Box display="flex" justifyContent={el.type === "Send" ? "flex-end" : "flex-start"} className={el.type === "Send" ? classes.sentMessage : classes.receivedMessage} mb={1}>
                        {el.message}
                      </Box>
                    </div>
                  ))}
                </Box>
                <form onSubmit={sendMessage}>
                  <TextField variant="outlined" placeholder="Type your message" className={classes.messageField} value={message} name="message" onChange={(e) => setMessage(e.target.value)} />
                  <IconButton type="submit" className={classes.messageButton} color="secondary">
                    <SendIcon />
                  </IconButton>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LiveChatPage;

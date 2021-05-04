import React, { useEffect, useState } from "react";
import { Avatar, List, ListItem, Badge, ListItemAvatar, ListItemText, Card, CardContent, Typography, Box, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

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
function ChatListComponent() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "ok") {
          console.log(res.data.data);
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
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6">Chat List</Typography>
          </Box>
          <List style={{ maxHeight: "50vh", overflow: "auto" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {users.map((el) => (
                  <>
                    {el.status ? (
                      <ListItem button key={el._id}>
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
                      <ListItem button key={el._id}>
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
    </div>
  );
}

export default ChatListComponent;

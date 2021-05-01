import React from "react";
import { Avatar, List, ListItem, Badge, ListItemAvatar, ListItemText, Card, CardContent, Typography, Box } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6">Chat List</Typography>
          </Box>
          <List>
            <ListItem button>
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
              <ListItemText primary="haha" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatListComponent;

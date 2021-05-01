import React from "react";
import { Avatar, Chip, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
}));

function MailListComponent() {
  const classes = useStyles();

  const listClicked = () => {
    console.log("list item clicked");
  };
  const deleteClicked = () => {
    console.log("Delete clicked");
  };
  return (
    <div>
      <List>
        <ListItem button onClick={listClicked}>
          <ListItemAvatar>
            <Avatar className={classes.green}>
              <MailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Single-line item" secondary={"I'll be in your neighborhood doing errands this…"} />
          <Chip variant="outlined" size="small" label="Sent" />
          <ListItemSecondaryAction onClick={deleteClicked}>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
}

export default MailListComponent;

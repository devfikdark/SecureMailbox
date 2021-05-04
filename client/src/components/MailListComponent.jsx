import React, { useEffect, useState } from "react";
import { Avatar, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import axios from "axios";

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

  const [mailList, setMailList] = useState([]);

  useEffect(() => {
    const currentEmail = localStorage.getItem("email");
    axios
      .get(`/emails/${currentEmail}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setMailList(res.data.data);
      });
  }, []);

  const listClicked = () => {
    console.log("list item clicked");
  };

  return (
    <div>
      <List>
        {mailList.map((el, i) => (
          <>
            <ListItem button onClick={listClicked} key={i + 1}>
              <ListItemAvatar>
                <Avatar className={classes.green}>
                  <MailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={el.subject} secondary={el.message} />
              <Chip variant="outlined" size="small" label={el.type === "Send" ? "Sent" : "Received"} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </div>
  );
}

export default MailListComponent;

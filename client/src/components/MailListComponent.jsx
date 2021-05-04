import React, { useEffect, useState } from "react";
import { Avatar, Box, Chip, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import moment from "moment";
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

  return (
    <div>
      <List>
        {mailList.map((el) => (
          <>
            <ListItem key={el._id}>
              <ListItemAvatar>
                <Avatar className={classes.green}>
                  <MailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1">{el.subject}</Typography>}
                secondary={
                  <Typography variant="body2" style={{ color: "#696969", width: "50vw" }}>
                    {el.message}
                  </Typography>
                }
              />

              <Divider orientation="vertical" />

              <Chip variant="outlined" size="small" label={el.type === "Send" ? "Sent" : "Received"} color={el.type === "Send" ? "secondary" : "primary"} />
              <Box px={2}>
                <Chip label={moment(el.createAt).fromNow()} />
              </Box>
              <Tooltip title="Download file">
                <IconButton aria-label="download" href={el.filePath} target="_blank">
                  <ArrowDownwardIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </div>
  );
}

export default MailListComponent;

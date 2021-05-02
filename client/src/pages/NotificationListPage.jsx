import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  notificationPanel: {
    backgroundColor: blueGrey[50],
    borderRadius: 10,
  },
}));

function NotificationListPage() {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="md">
        <Box my={4} display="flex" justifyContent="center">
          <Typography variant="h4">Notification List</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-start" className={classes.notificationPanel} p={2} mb={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Notification title</Typography>
              <Typography variant="caption">Sun 22, 2021</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sed eos iusto debitis odio nisi quam voluptatem eius voluptas nulla!</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default NotificationListPage;

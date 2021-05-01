import React from "react";
import { Box, Container, CssBaseline, Grid, Typography } from "@material-ui/core";
import MailListComponent from "../components/MailListComponent";

function MailPage() {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" p={2}>
          <Typography variant="h4" gutterBottom>
            Mail List
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MailListComponent />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MailPage;

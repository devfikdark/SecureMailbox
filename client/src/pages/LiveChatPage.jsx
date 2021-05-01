import { Container, CssBaseline, Grid } from "@material-ui/core";
import React from "react";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";

function LiveChatPage() {
  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: "3em" }}>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <ChatListComponent />
          </Grid>
          <Grid item xs={12} sm={8}>
            <ChatComponent />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LiveChatPage;

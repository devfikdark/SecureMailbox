import { Box, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function ChatComponent() {
  return (
    <div>
      <Card style={{ height: "70vh" }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={4}>
            <Typography>Username</Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatComponent;

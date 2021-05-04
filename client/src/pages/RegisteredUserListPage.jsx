import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Notification from "../components/Notification";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { Box, Container, Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0), createData("Ice cream sandwich", 237, 9.0, 37, 4.3)];

export default function BasicTable() {
  const classes = useStyles();

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
          setUsers(res.data.data);
        } else {
          Notification("Error", `${res.data.message}`, "error");
        }
      })
      .catch(() => Notification("Error", "Your session has expired. Please login again", "error"));
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4} display="flex" justifyContent="center">
        <Typography variant="h4">User List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Account Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row" align="center">
                  {row.fullName}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{moment(row.createAt).format("LLL")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

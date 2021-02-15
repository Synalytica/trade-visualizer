import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

export default function Orders() {
  var orders = [];

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("orders", JSON.stringify(data.orders));
    });

  // Create data for table
  var orderData = JSON.parse(localStorage.getItem("orders"));
  var currentOrder = {};
  var tagStringArray;

  for (var i = 0; i < orderData.length; i++) {
    if (i % 2 === 0) {
      currentOrder["entryTime"] = new Date(orderData[i].time * 1000).toString();
      tagStringArray = orderData[i].text.split(" ");
      currentOrder["entryPrice"] = tagStringArray[tagStringArray.length - 1];
      if (orderData[i].color === "green") {
        currentOrder["result"] = "Win";
      } else if (orderData[i].color === "red") {
        currentOrder["result"] = "Loss";
      }
      if (orderData[i].shape === "arrowUp") {
        currentOrder["direction"] = "Long";
      } else if (orderData[i].shape === "arrowDown") {
        currentOrder["direction"] = "Short";
      }
    } else {
      currentOrder["exitTime"] = new Date(orderData[i].time * 1000).toString();
      tagStringArray = orderData[i].text.split(" ");
      currentOrder["exitPrice"] = tagStringArray[tagStringArray.length - 1];
      orders.push(currentOrder);
      currentOrder = {};
    }
  }

  return (
    <React.Fragment>
      <Title>Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Entry time</TableCell>
            <TableCell align="center">Direction</TableCell>
            <TableCell align="center">Entry price</TableCell>
            <TableCell align="center">Exit price</TableCell>
            <TableCell align="center">Exit time</TableCell>
            <TableCell align="center">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => {
            return (
              <TableRow key={row.entryTime}>
                <TableCell align="center">{row.entryTime}</TableCell>
                <TableCell align="center">{row.direction}</TableCell>
                <TableCell align="right">{row.entryPrice}</TableCell>
                <TableCell align="left">{row.exitPrice}</TableCell>
                <TableCell align="center">{row.exitTime}</TableCell>
                <TableCell align="center">{row.result}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

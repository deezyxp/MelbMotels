import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button
} from "reactstrap";

import Table from "./Table.js";

export default props => {
  const [totalTables, setTotalTables] = useState([]);

  // User selection
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null
    },
    date: new Date(),
    time: null,
    area: "Select Area",
    size: 0
  });

  // User's booking details
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // List of potential locations
  const [area] = useState(["Any Area", "Outside", "Inside", "Bar"]);
  const [times] = useState([
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
  ]);
  // Verification of Reservation status
  const [reservationError, setReservationError] = useState(false);

  const getDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();
    let time = selection.time.slice(0, -2);
    time = selection.time > 12 ? time + 12 + ":00" : time + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
  };

  const getEmptyTables = () => {
    let tables = totalTables.filter(table => table.isAvailable);
    return tables.length;
  };

  return (
      <div>
          <p>Booking Page</p>
      </div>
  );
  };

//   Check if tables are available
//   Match availability with group size 
//   Check if reservation details are all filled out
//   Generate party size menu
//   Generate area menu
//   Generate time menu
//   Generate available tables
//   Render HTML code to display menus and buttons 
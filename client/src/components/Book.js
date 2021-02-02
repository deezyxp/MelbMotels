import React, { useState} from "react";
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import au from 'date-fns/locale/en-AU';
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
registerLocale('en-AU', au)

const Book = props => {
  const [totalTables, setTotalTables] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);

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

  // List of potential areas
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

  // useEffect(() => {
  //   // Check availability of tables from our database when a given date and time is selected from dropdown
  //   if (selection.time && selection.date) {
  //     (async () => {
  //       let datetime = getDate();
  //       let res = await fetch("/booking", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           date: datetime
  //         })
  //       });
  //       res = await res.json();
  //       // Filter available tables with area 
  //       let tables = res.tables.filter(
  //         table =>
  //           (selection.size > 0 ? table.capacity >= selection.size : true) &&
  //           (selection.location !== "Any Location"
  //             ? table.location === selection.location
  //             : true)
  //       );
  //       setTotalTables(tables);
  //     })();
  //   }
  // }, [selection.time, selection.date, selection.size, selection.location]);

  const getAvailableTables = async () => {
    console.log(selection);

    let res = await fetch("/table/available", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tableFilter: selection
      })
    });

    setAvailableTables(await res.json());
  };

  const reserveTable = async (table) => {    
    let res = await fetch("/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        tableDetails: table,
        date: selection.date.toLocaleDateString(),
        datetime: selection.date
      })
    });

    console.log(await res.json());

    // Redirect to confirmation screen with props
    props.setPage(2);
    
  }

  // Create reservation once details are filled out by User
  const reserve = async () => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {
      const datetime = getDate();
      let res = await fetch("/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          table: selection.table.id
        })
      });
      res = await res.text();
      console.log("Reserved: " + res);
      props.setPage(2);
    }
  };

  // Select table creates state with ID and name
  const selectTable = (table_name, table_id) => {
    setSelection({
      ...selection,
      table: {
        name: table_name,
        id: table_id
      }
    });
  };

  // Party size dropdown
  const getpartySize = () => {
    let newSizes = [];

    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-menu"
          onClick={e => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              size: i
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  // Generate area dropdown menu
  const getArea = () => {
    let newArea = [];
    area.forEach(loc => {
      newArea.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-menu"
          onClick={_ => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              area: loc
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });
    return newArea;
  };

  // Generate times dropdown menu
  const getTimes = () => {
    let newTimes = [];
    times.forEach(time => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-menu"
          onClick={_ => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              time: time
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  // Generating tables from available tables
  const getTables = () => {
    console.log("Getting tables");
    if (getEmptyTables() > 0) {
      let tables = [];
      totalTables.forEach(table => {
        if (table.isAvailable) {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              selectTable={selectTable}
            />
          );
        } else {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              selectTable={selectTable}
            />
          );
        }
      });
      return tables;
    }
  };

  return (
    <div>
      <Row noGutters className="text-center align-items-center">
        <Col>
          <p className="looking-for-pho">
            {!selection.table.id ? "Book a Table" : "Confirm Reservation"}
            <i
              className={
                !selection.table.id
                  ? "fas fa-chair "
                  : "fas fa-clipboard-check "
              }
            ></i>
          </p>
          <p className="selected-table">
            {selection.table.id
              ? "You are booking table " + selection.table.name
              : null}
          </p>

          {reservationError ? (
            <p className="reservation-error">
              * Please fill out all of the necessary details
            </p>
          ) : null}
        </Col>
      </Row>

      {/* Available Tables */}
      {
        availableTables.length !== 0 ? (
          availableTables.map(table => (
            <div>
              <h2>{ table.name }</h2>
              <h3>Capacity: {table.capacity}</h3>
              <Button
                color="none"
                className="book-table-btn"
                onClick={_ => {
                  reserveTable(table);
                }}
              >
                Reserve Table
                </Button>
            </div>
          ))
        ) : (
            <h1>Please enter details to find available tables</h1>
        )
      }

      {!selection.table.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="text-center align-items-center">
            {/* <Col xs="12" sm="3">
              <input
                type="date"
                required="required"
                className="booking-dropdown"
                value={selection.date.toISOString().split("T")[0]}
                onChange={e => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table
                      },
                      date: new Date(e.target.value)
                    };
                    setSelection(newSel);
                  } else {
                    console.log("Invalid date");
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table
                      },
                      date: new Date()
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Col> */}
            <Col>
              <DatePicker
                selected={null}
                onChange={date => setSelection({ ...selection, date})}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.time === null ? "Select a Time" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.area}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getArea()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.size === 0
                    ? "Select a Party Size"
                    : selection.size.toString()}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getpartySize()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col>
              <Button
                color="none"
                className="book-table-btn"
                onClick={_ => {
                  getAvailableTables();
                }}
              >
                Find Available Tables
                </Button>
            </Col>
          </Row>
          {/* <Row noGutters className="tables-display">
            <Col>
              {availableTables > 0 ? (
                <p className="available-tables">{getEmptyTables()} available</p>
              ) : null}

              {selection.date && selection.time ? (
                availableTables > 0 ? (
                  <div>
                    <div className="table-key">
                      <span className="empty-table"></span> &nbsp; Available
                        &nbsp;&nbsp;
                        <span className="full-table"></span> &nbsp; Unavailable
                        &nbsp;&nbsp;
                      </div>
                    <Row noGutters>{getTables()}</Row>
                  </div>
                ) : (
                    <p className="table-display-message">No Available Tables</p>
                  )
              ) : (
                  <p className="table-display-message">
                    Please select a date and time for your reservation.
                  </p>
                )}
            </Col>
          </Row> */}
        </div>
      ) : (
          <div></div>
        )}
      <div id="confirm-reservation-stuff">
        <Row
          noGutters
          className="text-center justify-content-center reservation-details-container"
        >
          <Col xs="12" sm="3" className="reservation-details">
            <Input
              type="text"
              bsSize="lg"
              placeholder="Name"
              className="reservation-input"
              value={booking.name}
              onChange={e => {
                setBooking({
                  ...booking,
                  name: e.target.value
                });
              }}
            />
          </Col>
          <Col xs="12" sm="3" className="reservation-details">
            <Input
              type="text"
              bsSize="lg"
              placeholder="Phone Number"
              className="reservation-input"
              value={booking.phone}
              onChange={e => {
                setBooking({
                  ...booking,
                  phone: e.target.value
                });
              }}
            />
          </Col>
          <Col xs="12" sm="3" className="reservation-details">
            <Input
              type="text"
              bsSize="lg"
              placeholder="Email"
              className="reservation-input"
              value={booking.email}
              onChange={e => {
                setBooking({
                  ...booking,
                  email: e.target.value
                });
              }}
            />
          </Col>
        </Row>
        <Row noGutters className="text-center">
          <Col>
            <Button
              color="none"
              className="book-table-btn"
              onClick={_ => {
                reserve();
              }}
            >
              Book Now
                </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Book;
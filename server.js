require("dotenv").config();
require("./config/database")();
const express = require("express");
const app = express();

// Configure body parsing for AJAX requests
app.use(express.json());

const PORT = process.env.PORT || 3001;
// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


// Add routes, both API and view
app.use("/booking", require("./routes/bookingRoute"));
app.use("/reserve", require("./routes/reservationRoute"));

// app.use("/api", passportConfig.authenticate('local'));

// Start the API server
app.listen(PORT, () =>
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
require("dotenv").config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();

// Routes 
const tableRoutes = require("./routes/table");
const reservationRoutes = require('./routes/reservation');

// Configure body parsing for AJAX requests
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    }, (err) => {
        if (err) console.error(err);
        console.log("🌎 Successfully connected to DB");
    }
);

// Add routes, both API and view
app.use("/reservation", reservationRoutes);
app.use("/table", tableRoutes);

// Start the express server
app.listen(PORT, () =>
    console.log(`🌎 ==> Server now listening on PORT ${PORT}!`)
);
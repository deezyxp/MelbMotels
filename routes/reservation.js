const express = require("express");
const router = express.Router();

const Reservation = require('../models/Reservation');

router.post("/", function(req, res) {
    console.log(req.body);

    Reservation.create({
        name: req.body.name,
        phone: req.body.name,
        email: req.body.email,
        date: req.body.date,
        datetime: new Date(req.body.datetime), 
        table: req.body.tableDetails._id
    }, (err, reservation) => {
            if (err) return console.debug(err);

            console.log("Reservation Created");

            return res.json(reservation);
    })
});

module.exports = router;
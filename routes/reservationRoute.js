var express = require("express");
var router = express.Router();


const Day = require("../models/Day");

const Reservation = require("../models/reservation");

router.post("/", function(req, res, next) {
  Day.find({ date: req.body.date }, (err, day) => {
    if (!err) {
      if (day.length > 0) {
        let day = day[0];
        day.tables.forEach(table => {
          if (table._id == req.body.table) {
            table.reservation = new Reservation({
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email
            });
            table.isAvailable = false;
            day.save(err => {
              if (err) {
                console.log(err);
              } else {
                console.log("Reserved");
                res.status(200).send("Added Reservation");
              }
            });
          }
        });
      } else {
        console.log("Date not found");
      }
    }
  });
});

module.exports = router;
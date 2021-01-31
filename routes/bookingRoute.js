var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Date = require("../models/day").model;


router.post("/", function(req, res, next) {
  console.log("booking request posted");

  console.log(req.body);
  const dateTime = new Date(req.body.date);

  Date.find({ date: dateTime }, (err, docs) => {
    if (!err) {
      if (docs.length > 0) {
        // Booking exists
        console.log("Booking exists. Sent docs.");
        res.status(200).send(docs[0]);
      } else {
        // create new date on record
        const allTables = require("../database/seeds/tableSeeder");
        const day = new Day({
          date: dateTime,
          tables: allTables
        });
        day.save(err => {
          if (err) {
            res.status(400).send("Error unable to book date");
          } else {
            // return all tables
            console.log("Created new datetime. Here are the default docs");
            Day.find({ date: dateTime }, (err, docs) => {
              err ? res.sendStatus(400) : res.status(200).send(docs[0]);
            });
          }
        });
      }
    } else {
      res.status(400).send("Could not search for date");
    }
  });
});

module.exports = router;
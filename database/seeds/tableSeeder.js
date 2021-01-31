var mongoose = require("mongoose");
const Table = require("../models/table").model;
const fs = require("fs");

let tableData = fs.readFileSync(__dirname + "/tableseed.json");
tableData = JSON.parse(tableData).tables;

let allTables = [];
tableData.forEach(table => {
  allTables.push(new Table(table));
});

module.exports = allTables;
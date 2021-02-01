var mongoose = require("mongoose");
const Table = require("../../models/Table");
const fs = require("fs");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/photastic",
  {
      useCreateIndex: true,
      useNewUrlParser: true,
  }
);

let tableData = JSON.parse(fs.readFileSync(__dirname + "/tableseed.json", 'utf-8'));

let allTables = [];

tableData.table.forEach(table => {
  Table.create(table, (err, table) => {
    if (err) return console.error(err);
    console.log("Table successfully created: ", table);
  });
});

module.exports = allTables;
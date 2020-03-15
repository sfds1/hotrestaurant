// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
// Need this to get req.body in the app.post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up variables to hold the reserved tables and the waitlist
// =============================================================
var tableList = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the home Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Basic route that sends the user to the reservation page
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Basic route that sends the user to the table listing page
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all reserved tables in the API link
app.get("/api/tableList", function(req, res) {
  return res.json(tableList);
});

// Displays all waitlist in the API link
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});



// Create New reservation
app.post("/api/reservations", function(req, res) {

  var newReservation = req.body;

  // If the reservation table has 5 records, then the next reservation will go to the waitlist
  if (tableList.length < 5){
    tableList.push(newReservation);
    res.json(true);
  } else {
    waitlist.push(newReservation);
    res.json(false);
  }
 
});

// clears the reservation and waitlist tables by setting the array lengths to zero
app.post("/api/clear", function(req, res) {
  tableList.length = 0;
  waitlist.length = 0;
  res.json("Done")
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

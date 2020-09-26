// Dependencies
var express = require("express");
var path = require("path");

//Sets up the Express App
var app = express();
var PORT = 3000;

//Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES

// HTML Routes
// Returns the notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Return the index.html
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// API Routes

// load Data
// var savedNotes = require("../db/db");

// GET /api/notes returns db.json
// app.get("/api/notes", function (req, res) {
// res.json(savedNotes);
// });

// POST /api/notes receive a new note to save on the request body
// add to the db.json file
// return the new note to the client

// DELETE /api/notes/:id receive a query parameter containing id of note to delete
// read all notes from db.json
// remove note with given id
// rewrite note to db.json

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
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
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Routes
// GET /api/notes returns db.json
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      throw err;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST /api/notes receive a new note to save in the request body
app.post("/api/notes", function (req, res) {
  // assigns UUID to the note
  const newNote = req.body;
  newNote.id = uuid.v4();
  // Reads the JSON file
  let notes = fs.readFileSync("./db/db.json", "utf8");
  // Parses the data to get an array
  notes = JSON.parse(notes);
  // Pushes the new note into the array
  notes.push(newNote);
  // Writes the new note to the JSON file
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  // Returns the file with the new note added
  res.json(notes);
});

// DELETE /api/notes/ by id
// app.delete("/api/notes", function (req, res) {
// read all notes from db.json
// let notes = fs.readFileSync("./db/db.json", "utf8");
// Parses the data to get an array
// notes = JSON.parse(notes);
// });

// remove note with given id
// rewrite note to db.json

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

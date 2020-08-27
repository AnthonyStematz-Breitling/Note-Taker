var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function(req, res) { 
    res.sendFile(path.join(`${__dirname}/public/notes.html`));
});

app.get("/api/notes", function(req, res) {
    //reads the database
    // and puts the objects into notelistItems array
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let allNotes = JSON.parse(data);
        res.json(allNotes)
    });
});

    //takes the unique id of this note
    //finds the note with that id in the database
    //removes that note
app.get("*", function(req, res) {
    res.sendFile(path.join(`${__dirname}/public/index.html`));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
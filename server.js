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

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", function(req, res) {
    //reads the database
    // and puts the objects into notelistItems array
    fs.readFile('db.json', (err, data) => {
        if (err) throw err;
        let note = JSON.parse(data);
        console.log(note);
        return note
    });
    res.sendFile(path.join(__dirname, "notes.html"));
});
num = 1
app.post("/api/notes", function(req,res){
    num = num++
    var newNotes = req.body
    console.log(newNotes)
    //takes new note
    //assigns unique id to the note
    newNotes.id = num
    fs.appendFile(db.json, JSON.parse(newNotes))
    //transfer that note into a JSON object
    //put it into the the data base
    //return the updated notes s

});

app.delete("/api/notes", function(req, res){
    var deleteNote = req.body
    deleteNote.id
    //takes the unique id of this note
    //finds the note with that id in the database
    //removes that note
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
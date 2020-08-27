var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5000;

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
let num = 0
app.post("/api/notes", function(req,res){
    num++
    var newNote = req.body
    console.log(newNote)
    //takes new note
    //assigns unique id to the note
    newNote.id = String(num)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let allNotes = JSON.parse(data);
        allNotes.push(newNote)
        fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err, data) =>{
            if(err) throw err;
            res.json(allNotes)
        })
    });
    
    //transfer that note into a JSON object
    //put it into the the data base
    //return the updated notes 
});

app.delete("/api/notes/:id", function(req, res){
    var  noteId = req.params.id;
    console.log(noteId)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let allNotes = JSON.parse(data);
        console.log(allNotes)
        let afterRemoved = allNotes.filter(value => value.id !== noteId);
        fs.writeFile("./db/db.json", JSON.stringify(afterRemoved), (err, data) =>{
            if(err) throw err;
            res.json(afterRemoved)
        })
    });
    //takes the unique id of this note
    //finds the note with that id in the database
    //removes that note
});
app.get("*", function(req, res) {
    res.sendFile(path.join(`${__dirname}/public/index.html`));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
var express = require("express");
var path = require("path");
const { fstat } = require("fs");

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
    fs.readFile(db.json)
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.post("/api/notes", function(req,res){
    var newNotes = req.body
});

app.delete("/api/notes", function(req, res){
    
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
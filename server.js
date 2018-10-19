var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
require("./controllers/scrape.js")(app);
require("./controllers/headline.js")(app);
require("./controllers/note.js")(app);

app.use(express.static(__dirname + "/public"));
// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main",
partialsDir: __dirname+ "/views/layouts/partials"
}));
app.set("view engine", "handlebars");

// Mongo DB connect
var MONGODB_URI = process.env.MONGODB_URI;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI || "mongodb://localhost/mongoNewsscraper", {
  useMongoClient: true
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  
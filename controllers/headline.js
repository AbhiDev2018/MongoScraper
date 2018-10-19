var express = require("express");
var mongojs = require("mongoose");
var db = require("../models");
module.exports = function(app) {

    app.get("/", function(req, res) {
        db.Article.find({"saved": false}, function(error, data) {
          var hbsObject = {article: data };
          res.render("home", hbsObject);
        }); });

    app.get("/saved", function(req, res) {
        db.Article.find({"saved": true}).populate("notes").exec(function(error, data) {
          var hbsObject = { article: data };
          res.render("saved", hbsObject);
        });  });

    app.get("/articles", function(req, res) {
        db.Article.find({}, function(error, doc) {
          if (error) {console.log(error); }
          else {res.json(doc);}
        }); });

   app.post("/articles/save/:id", function(req, res) {
         db.Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true},{new: true})
        .exec(function(err, doc) {
          if (err) {
            console.log(err);}
          else { res.send(doc);}
        });});
  
  app.post("/articles/delete/:id", function(req, res) {
        db.Article.findOneAndUpdate({ "_id": req.params.id }, {"saved": false, "notes": []})
               .exec(function(err, doc) {
          if (err) {
            console.log(err); }
          else {res.send(doc);}
        });
  });

}
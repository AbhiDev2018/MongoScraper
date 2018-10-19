
var db = require("../models");
var express = require("express");
var mongojs = require("mongoose");

module.exports = function(app) {

 app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ "_id": req.params.id })
    .populate("note")
      .exec(function(error, doc) {
        if (error) {console.log(error);}
         else {res.json(doc); }
    });});

app.post("/notes/save/:id", function(req, res) {
    console.log("Inside this post block to save note!!")
    console.log(req.body.text);
    var Note_to_be_added = new db.Note({
      body: req.body.text,
      article: req.params.id });
    console.log(req.body)
    Note_to_be_added.save(function(error, note) {
          if (error) {console.log(error);}
    else {
     db.Article.findOneAndUpdate({ "_id": req.params.id }, {$push: { "notes": note } })
              .exec(function(err) {
            if (err) { console.log(err);
            res.send(err);
          }
          else { res.send(note);}
        });
      } }); });
      
    app.delete("/notes/delete/:note_id/:article_id", function(req, res) {
      db.Note.findOneAndRemove({ "_id": req.params.note_id }, function(err) {
        if (err) { console.log(err);
                   res.send(err);  }
        else { db.Article.findOneAndUpdate({ "_id": req.params.article_id }, {$pull: {"notes": req.params.note_id}})
               .exec(function(err) {
              if (err) { console.log(err);
                         res.send(err); }
              else { res.send("Note was deleted");
              }
            });
        } }); });
}
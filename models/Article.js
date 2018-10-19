var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// article schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    required: true,
    default: false
  },
  notes: [{
     type: Schema.Types.ObjectId,
     ref: "Note"
  }]
});

// Article model 
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
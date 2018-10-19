var db = require("../models");
var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function (app) {
	app.get("/scrape", function (req, res) { console.log("Hellow");
		axios.get("https://www.nytimes.com/section/us").then(function (response) {
			var $ = cheerio.load(response.data);
			$("article.story").each(function (i, element) {
			var result = {};
				result.title = $(this).children(".story-body").children("a.story-link").children(".story-meta")
					.children("h2.headline").text();
				result.link = $(this).children(".story-body").children("a.story-link").attr("href");
				result.summary = $(this).children(".story-body").children("a.story-link").children(".story-meta")
					.children("p.summary").text();
				db.Article.create(result)
					.then(function (dbArticle) {console.log(dbArticle);})
					.catch(function (err) { return res.json(err);});
			})
                    res.send("Scrape Complete");
		})
	})
}
"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

// require mongo
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";


// sass middleware
const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path'); // allows you to work with file and directory paths

app.use(bodyParser.urlencoded({ extended: true }));

app.use(nodeSassMiddleware({
  src: path.join(__dirname, '../src'),
  dest: path.join(__dirname, '../public/styles'),
  debug: true,
  outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, "../public"))); // "public" specifies the root directory to serve static assets


// connect to MongoDB
MongoClient.connect(MONGODB_URI, function(err, db) {
  // if error occurs
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  // (hint hint).
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);  // returns an object of functions saveTweet and getTweets

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers); //consists of the routes

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes); // only requests to /tweets/* will be sent to our "router"

  app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
  });

});



"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const cookieSession = require("cookie-session")

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// app.use('/users', userRoutes(knex))
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

//Cookie Session req.session
app.use(cookieSession({
  name: "session",
  keys: ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"],
  maxAge: 2343254365464675476576
}));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes

// Home page

app.get("/", (req, res) => {
  knex.from('cards').select('id', 'url').then(cards => {
    let templateVars = {prize: cards};
    res.render('goofspiel', templateVars);
  });
});

app.get("/", (req, res) => {
  knex.from('cards').select('id', 'url').then(cards => {
    let templateVars = {prize: cards};
    res.render('goofspiel', templateVars);
  });
});

app.get("/game/:matchID", (req, res) => {
  knex.from('matches').select('*').where({game_id: req.params.game_id}).then(matches => {
    let templateVars = {matches: matches};
    res.render('allgames', templateVars);
  });
});

app.post("/game/:matchId", (req, res) => {
  knex('matches')
  .insert({player1_name: req.session.player, game_id: 1})
    .then(function(res) {
    });
    res.redirect("/");

  // create game in DB and save to variable
});

app.post("/match/:matchId/join", (req, res) => {
    knex('matches').where({'id': req.params.matchId}).update({player2_name: req.session.player})
    .then(function(res) {
    });
  res.render("goofspiel")
})

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/games", (req, res) => {
  res.render("games_index");
})

app.post("/login", (req, res) => {
  req.session.player = req.body.username
  knex('players')
    .insert(
      { name: req.body.username })
    .asCallback((err) => {
      res.redirect("/games");
      if (err) {
        console.log(err);
      }
    }
    )
});

app.post("/lock", (req, res) => {
  const cardId = req.body.cardId
  knex('rounds').insert(
    { bid: Number(req.body.cardId) }
  )
    .asCallback((err) => {
      if (err) {
        console.log(err);
      }
    })
})

app.listen(PORT, () => {

  console.log("DigiGames listening on port " + PORT);
});

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
const deck = function() {
  let suits = ['hearts', 'clubs', 'diamonds', 'spades'];
  let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let fullDeck = [];
  for (let suit of suits){
    for (let value of values){
      fullDeck.push({suit: suit, value: value})
    }
  } return fullDeck;
}

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
    res.render('goofspiel');
  });



app.get("/games/:game_id", (req, res) => {
  knex.from('matches').select('*').where({game_id: req.params.game_id}).where({player2_name: null}).then(matches => {
    let templateVars = {matches: matches};
    res.render('gfLobby', templateVars);
  });
});


// app.post("/games/:gameId", (req, res) => {
//   const create = knex('matches')
//   .insert({player1_name: req.session.player, game_id: req.params.game_id}, 'player1_name')
//     .then(function(res) {
//     });
//     res.redirect("/");
//   // create game in DB and save to variable

// });

app.post("/games/:matchId", (req, res) => {
  knex('matches')
  .insert({player1_name: req.session.player, game_id: 1})
  .returning('id')
  .then(function(ids) {
    let newArray = deck().map(function(el){
      return {...el, match_id: ids[0]}
    })
    return knex('cards').insert(newArray);
  })
  .then(function(){
    res.redirect("/");
  })
  .catch(function(err){
    console.log(err);
  })

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
  console.log("REQQQQQQ", req)
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

// Also need to insert match_id(probably from req.params.match_id), player_id(From cookie) and round_num(should be auto-incrementing?).

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

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

app.get("/", (req, res) => {

    knex('cards').select().where({match_id: 115})
    .returning('value')
    .then(function(values){
      let cards = [];
      for(let value of values){
        if(value.suit === 'spades' || value.suit === 'hearts'){
          cards.push({value: value.value, suit: value.suit })
        }
      }
      let templateVars = {data: cards};
      res.render('goofspiel', templateVars);
    })
  })

app.get("/games/:game_id", (req, res) => {
  knex.from('matches').select('*').where({game_id: req.params.game_id}).where({player2_name: null}).then(matches => {
    let templateVars = {
      matches: matches
    };
    console.log("matches!!", matches)
    res.render("gfLobby", templateVars);
  });
});

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
  .then(function() {
    knex('cards').update({hand_id: 3}).where({suit: 'spades', match_id: 20})
  })

  .then(function(){
    knex('cards').update({hand_id: 4}).where({suit: 'hearts', match_id: 20})
    .then(function() {
    })
  })
  .then(function(){
    res.redirect("/");
  })
  .catch(function(err){
    console.log(err);
  })
});

app.post("/match/:matchId/join", (req, res) => {
  knex('matches').where({id: req.params.matchId}).update({player2_name: req.session.player})
  .then(function(result) {

    res.redirect("/")
  });
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

// Also need to insert match_id(probably from req.params.match_id), player_id(From cookie) and round_num(should be auto-incrementing?).

app.post("/lock", (req, res) => {
  const cardId = req.body.cardId
  knex('rounds').insert(
    { player1_bid: 5 }
  )
    .asCallback((err) => {
      if (err) {
        console.log(err);
      }
    })
    .then(function(){
      res.redirect("/")
    })
})

app.listen(PORT, () => {
  console.log("LastMinuteGames listening on port " + PORT);
})

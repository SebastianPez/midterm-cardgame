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
  let suits = ['hearts', 'diamonds', 'spades'];
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

// Mount all resource routes

// Home page
<<<<<<< HEAD

let player2_name;
app.get("/", (req, res) => {
  let cardType = 'spades';
  if (req.session.player === player2_name) {
    cardType = "diamonds"
  }
  let passedID = decodeURIComponent(req.query.valid);
  let prizeCards = [];
  knex('cards').select().where({suit: 'hearts', match_id: passedID})
  .returning('value')
  .then(function(values) {
    for (let value of values) {
      if (value.suit === 'hearts') {
        prizeCards.push({value: value.value, suit: value.suit})
      }
    }
  })
  
      knex('cards').select().where({ suit: cardType, match_id: passedID })
      .returning('value')
      .then(function(values){
        let cards = [];
        for(let value of values){
          if(value.suit === cardType){
            cards.push({value: value.value, suit: value.suit })
          }
        }
        console.log(cards);
        let imagesArray = [];
        let temp = "";
        cards.forEach(function(element){
          temp = "images/"+element.value+element.suit+".jpg";
          imagesArray.push(temp);
        });
        let templateVars = {data: imagesArray, prize: prizeCards};
        console.log(prize);
        res.render('goofspiel', templateVars);
      })
  })

=======
let player2_name;
app.get("/", (req, res) => {
  var cardType = "spades"
  if(req.session.player === player2_name) {
    cardType = "diamonds"
  }
    knex('cards').select().where({suit: cardType, match_id: 1})
    .returning('value')
    .then(function(values){
      let cards = [];
      for(let value of values){
        if(value.suit === cardType){
          cards.push({value: value.value, suit: value.suit })
        }
      }
      console.log(cards);
      let imagesArray = [];
      let temp = "";
      cards.forEach(function(element){
        temp = "images/"+element.value+element.suit+".jpg";
        imagesArray.push(temp);
      });
      let templateVars = {data: imagesArray};
      res.render('goofspiel', templateVars);
    })
})
>>>>>>> 64328c483322d950633aab285ffd6aacf6ca54ac
app.get("/games/:game_id", (req, res) => {
  knex.from('matches').select('*').where({game_id: req.params.game_id}).where({player2_name: null}).then(matches => {
    let templateVars = {
      matches: matches
    };
    res.render("gfLobby", templateVars);
  });
});

app.post("/games/:matchId", (req, res) => {
  let thisMatchId = 0;
  let strthisMatchId;
  knex('matches')
  .insert({player1_name: req.session.player, game_id: 1})
  .returning('id')
  .then(function(ids) {
    let newArray = deck().map(function(el){
<<<<<<< HEAD
      thisMatchId = ids[0];
      strthisMatchId = encodeURIComponent('' + thisMatchId);
      return {...el, match_id: ids[0]}
=======
      return {...el, match_id: 1} //ids[0]
>>>>>>> 64328c483322d950633aab285ffd6aacf6ca54ac
    })
    return knex('cards').insert(newArray);
  })
  .then(function() {
<<<<<<< HEAD
    console.log(thisMatchId);
    knex('cards').update({hand_id: 2}).where({suit: 'hearts', match_id: thisMatchId})
    .then(function() {
    })
  })
  .then(function(){
    knex('cards').update({hand_id: 1}).where({suit: 'spades', match_id: thisMatchId})
    .then(function() {
    })
=======
    knex('cards').update({hand_id: 3}).where({suit: 'spades', match_id: 1})
>>>>>>> 64328c483322d950633aab285ffd6aacf6ca54ac
  })
  .then(function(){
<<<<<<< HEAD
    knex('cards').update({hand_id: 3}).where({suit: 'diamonds', match_id: thisMatchId})
=======
    knex('cards').update({hand_id: 4}).where({suit: 'hearts', match_id: 1})
>>>>>>> 64328c483322d950633aab285ffd6aacf6ca54ac
    .then(function() {
    })
  })
  .then(function(){
    res.redirect("/?valid=" + strthisMatchId);
  })
  .catch(function(err){
    console.log(err);
  })
});

app.post("/match/:matchId/join", (req, res) => {
  let strthisMatchId;
  knex('matches').where({id: req.params.matchId}).update({player2_name: req.session.player})
  .then(function(result) {
<<<<<<< HEAD
    strthisMatchId = encodeURIComponent('' + req.params.matchId);
    player2_name = req.session.player;
    res.redirect('/?valid=' + strthisMatchId)
=======
    player2_name = req.session.player;
    res.redirect("/")
>>>>>>> 64328c483322d950633aab285ffd6aacf6ca54ac
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
    { player1_bid: Number(req.body.cardId) }
  )
    .asCallback((err) => {
      if (err) {
        console.log(err);
      }
    })
})

app.listen(PORT, () => {
  console.log("LastMinuteGames listening on port " + PORT);
});


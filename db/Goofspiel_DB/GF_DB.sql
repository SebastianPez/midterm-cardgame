create database midterm;
  \c midterm;

create table game (
  id integer PRIMARY KEY,
  name varchar(50)
  );

create table match (
  id integer PRIMARY KEY,
  game_id integer,
  player1_name varchar(50),
  player2_name varchar(50),
  match_date varchar(50),
  winner varchar(50)
  );

create table player (
  id integer PRIMARY KEY,
  name varchar(50)
  );

create table round (
  id integer PRIMARY KEY,
  match_id integer,
  player_id varchar(50),
  points integer,
  roundMaster_id integer
  );

create table roundMaster (
  id integer PRIMARY KEY,
  roundNO integer,
  game_id integer
  );

create table hand (
  id integer PRIMARY KEY,
  player_name integer,
  match_id integer,
  round_id integer,
  card_id varchar(50)
  );

create table card (
  id varchar(50) PRIMARY KEY,
  player_id integer
  )



INSERT INTO game (id, name)
VALUES (1, 'Goofspiel');

INSERT INTO player (id, name)
VALUES (1, 'Boksul');

INSERT INTO player (id, name)
VALUES (2, 'Ronan');

INSERT INTO player (id, name)
VALUES (3, 'Sebastian');

INSERT INTO match (id, game_id, player1_name, player2_name, match_date, winner)
VALUES (1, 1, 'Boksul', 'Sebastian','', 'Boksul');


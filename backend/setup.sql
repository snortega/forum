drop database if exists forum_app_2;
create database forum_app_2;
use forum_app_2;

drop table if exists users;
create table users (
  id int auto_increment primary key,
  username varchar(255) unique not null,
  password varchar(255) not null
);

drop table if exists threads;
create table threads (
	id int auto_increment primary key,
    op varchar(255) not null,
    title varchar(255) not null,
    body varchar(2000) not null
);

drop table if exists replies;
create table replies (
	id int auto_increment primary key,
    replier varchar(255) not null,
    reply_to int,
    body varchar(2000) not null
);
const express = require('express');
const passport = require('passport');
const GoogleStrgedy = require('passport-google-oauth20').Strategy;

const app = express();
passport.use(new GoogleStrgedy());

const PORT = process.env.PORT || 5000 //so that heroku can pass port dynamically. default port : 5000
app.listen(PORT);


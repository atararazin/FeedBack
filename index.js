const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const parser = require('body-parser');


mongoose.connect(keys.mongoURI);


const app = express();

app.use(parser.json());
app.use(
    cookieSession({
        maxAge: 30 *24 * 60 * 60 * 1000, //30 days
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//ony run if its in production mode - on heroku
if(process.env.NODE_ENV == 'production'){
    //if we can't find a route, check at client/build
    app.use(express.static('client/build'))

    //if can't find a route get it the index.html file
    const path = require('path');
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__direname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000 //so that heroku can pass port dynamically. default port : 5000
app.listen(PORT);


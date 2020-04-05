const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ 'hi' : 'there, atara'});
});

const PORT = process.env.PORT || 5000 //so that heroku can pass port dynamically. default port : 5000
app.listen(PORT);
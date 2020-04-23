
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('survey');

module.exports = (app) => {  
    //route handler for creating a new survey
    app.post('/api/survey', requireLogin, requireCredits, (req,res) => {
        const {title, subject, body, recipients } = req.body;
        
        const survey = new Survey({
            title,
            subject,
            body,
        })
    });
};
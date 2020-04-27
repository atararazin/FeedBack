
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {  
    //route handler for creating a new survey
    app.post('/api/survey', requireLogin, requireCredits, (req,res) => {
        const {title, subject, body, recipients } = req.body;
        
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(
                email => {
                    return { email: email.trim() }
                    }
                ),
            dateSent: Date.now(),
            _user: req.user.id,
        })

        //send an email
        const mailer = new Mailer(survey, template(survey));
        mailer.send();
    });
};
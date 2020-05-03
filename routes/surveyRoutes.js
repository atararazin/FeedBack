
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {  
    //route handler for creating a new survey
    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
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
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();//save to database
            req.user.credits -= 1
            const user = await req.user.save();
            res.send(user); //send to the frontend
        } catch(err){
            res.status(422);
        }
        
    });

    app.get('/api/surveys/thanks', (req,res) => 
        {
            res.send("Thanks for giving your feedback!");
        }
    )



};
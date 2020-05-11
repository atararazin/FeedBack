
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const { Path}  = require('path-parser');
const { URL } = require('url');
const { ObjectId } = require('mongodb');



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

    //get our surveys from the DB
    app.get('/api/surveys', requireLogin, async (req,res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });//dont select the recip list
        res.send(surveys);
    })

    app.get("/api/surveys/:surveyId/:choice", (req,res) => 
        {
            res.send("Thanks for giving your feedback!");
        }
    )

    app.post('/api/surveys/webhooks', (req,res) => {   
            const p = new Path("/api/surveys/:surveyId/:choice");

            _.chain(req.body)
                .map(({ email, url }) => {
                    const match = p.test(new URL(url).pathname);
                    if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                    //update whatever the first parameter finds with the second parameter
                    Survey.updateOne({
                        _id: new ObjectId(surveyId),
                        recipients: {
                            $elemMatch: { email: email, voted: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },//mongo operator - logic inside a query - find a choice property and increment it by one
                        $set: { 'recipients.$.voted': true },//update the responded to true
                        lastResponded: new Date()
                    }).exec();
                })
            .value();
            
            res.send({});
        }
    )
};
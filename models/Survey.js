const mongoose = require('mongoose');
const {Schema} = mongoose;

const RecipientSchema = require('./Recipient');

const surveysSchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yesAnswer: { type: Number, default: 0 },
    noAnswer: { type: Number, default: 0 },
    dateSent: Date,
    lastResponded: Date,
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
});

mongoose.model('surveys', surveysSchema);//create a surveys collection

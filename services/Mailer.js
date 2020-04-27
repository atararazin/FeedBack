const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgAPI = sendgrid(keys.sendGridKey);//sendgrid library directly not helper.Mail
        this.from_email = new helper.Email('johnnysmith3883@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);
        
        this.addContent(this.body);//extended from helper.Mail
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients){
        //for each recipient return the email
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    //sendgrid setup
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings;
        const clickTracking = new helper.ClickTracking(true,true);//trying this

        trackingSettings.setClickTracking(clickTracking);

        this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){
        const personalize = new helper.Personalization();
        //add each recipient to the personalize object
        this.recipients.forEach(recipients => {
            personalize.addTo(recipients);
        });
        this.addPersonalization(personalize);
    }

    async send(){
        const request = this.sgAPI.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgAPI.API(request);
        return response;
    }
}

module.exports = Mailer;
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) =>{
       
    //route handler for stripe payments
    app.post('/api/payments', requireLogin ,async (req,res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 Emaily credits',
            source: req.body.id,
        });

        //add 5 to reference's credit and save to database
        req.user.credits += 5;
        const user = await req.user.save();
        //send to frontend
        res.send(user);
    });
};

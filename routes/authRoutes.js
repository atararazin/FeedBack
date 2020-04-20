const passport = require('passport')

module.exports = (app) =>{
    //route handler for /auth/google
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']//permissions
    }));

    //route handler for /auth/google/callback
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            //passes on to next request handler
            res.redirect('/surveys');
        } 
    )

    app.get('/api/logout', (req,res) => 
        {
            req.logout();
            res.redirect('/');
        }
    )

    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    })

}

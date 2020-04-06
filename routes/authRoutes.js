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
        passport.authenticate('google')
    )

}

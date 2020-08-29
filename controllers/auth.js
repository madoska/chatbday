const passport = require('passport');
const session = require('express-session');
const facebookStrategy = require('passport-facebook').Strategy;
const Users = require('../models/Users');

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (id, done) {
    return done(null, id)
})

passport.use(new facebookStrategy(
    {
        clientID: "618996698804528",
        clientSecret: "3b463b329a47e06b649636ea758107e4",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'name', 'email', 'picture.type(large)']
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null, profile)
    })
)
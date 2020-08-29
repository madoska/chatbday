const passport = require('passport');
const session = require('express-session');
const facebookStrategy = require('passport-facebook').Strategy;
const Users = require('../models/Users');
const usersRouter = require('../routes/users');

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
        profileFields: ['id', 'name', 'email', 'picture.type(large)', 'birthday']
    },
    (accessToken, refreshToken, profile, done) => {
        // search for user's ID in mongo collection
        Users.findOne({ 'id': profile.id }, (err, user) => {
            // if error, return error
            if (err) {
                return done(err);
            } else { }

            // if user with matching userID found, log them in
            if (user) {
                if ({ 'birthday': null }) {
                    console.log("You do not have a birthday");
                    return done(null, user);
                } else {
                    console.log(user)
                    return done(null, user);
                }
            } else {
                // if userID does not exist in collection, create new user
                const newUser = new Users();

                // insert all facebook profile data in our schema
                newUser.id = profile.id;
                newUser.firstname = profile.name.givenName;
                newUser.lastname = profile.name.familyName;
                newUser.email = profile.emails[0].value;
                newUser.picture = profile.photos[0].value;
                newUser.birthday = profile.birthday;    // app must be reviewed by facebook in order to get permission for birthday
            }

            // save user to database
            newUser.save(function (err) {
                if (err) {
                    throw err;
                } else {
                    return done(null, newUser);
                }
            });
        })
    })
)
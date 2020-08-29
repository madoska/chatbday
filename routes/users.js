const express = require('express');
const usersRouter = express.Router();
const authController = require('../controllers/auth');
const passport = require('passport');

/* GET users listing. */
usersRouter.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

usersRouter.get('/auth/facebook', passport.authenticate('facebook', {
  scope: 'email'
}))

usersRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  })
)

usersRouter.get('/profile', (req,res) => {
  res.send("you are a valid user")
})

usersRouter.get('/', (req,res) => {
  res.send("you are not a valid user")
})


module.exports = usersRouter;

const express = require('express');
const usersRouter = express.Router();
const authController = require('../controllers/auth');
const passport = require('passport');

usersRouter.get('/join', function(req, res, next) {
  res.render('join', { title: 'Signup' });
});

usersRouter.get('/birthday', function(req, res, next) {
  res.render('birthday', { title: 'Signup' });
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

usersRouter.get('/profile', birthdayCheck, (req,res) => {
  res.send("you are a valid user")
})

function birthdayCheck(req,res,next){
  if({'birthday' : null}){
    console.log("you don't have a birthday")
    res.redirect('/')
  } else {
    console.log("you do have a birthday")
    res.redirect('/birthday')
  }
}

usersRouter.get('/', (req,res) => {
  res.send("you are not a valid user")
})


module.exports = usersRouter;

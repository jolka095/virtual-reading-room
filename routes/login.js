const express = require('express');
const router = express.Router();
const passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

LocalStrategy = require('passport-local').Strategy;
const db = require('../db');

router.get('/', function(req, res, next) {
  res.render('login', {  });
});

router.use(session({
    secret: '{secret}',
    name: 'session_id',
    saveUninitialized: true,
    resave: true})
);

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

router.post('/', passport.authenticate('local', {
    successRedirect: '/library',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: "Welcome!"}),
);

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true },

    function (req, username, password, done){
        if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }

        const sql=`SELECT * FROM users WHERE email="${req.body.email}" and password="${req.body.password}";`;

        db.query(sql, function(err, result){

            if (err) return done(req.flash('message',err + req.flash('message','Invalid username or password.')));

            if(!result.length){ return done(null, false, req.flash('message','Invalid username or password.')); }

            var encPassword = req.body.password;
            var dbPassword  = result[0].password;

            if(!(dbPassword === encPassword)){
                return done(null, false, req.flash('message','Invalid username or password.'));
            }

            return done(null, result[0]);
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.username);
});

passport.deserializeUser(function(user, done){

    db.query("SELECT * FROM users WHERE username=" + user.username , function (err, rows){
        done(err, rows);
    });
});

function authenticationMiddleware(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;

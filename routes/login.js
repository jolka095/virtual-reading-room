const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
const jwt = require('jsonwebtoken');

const db = require('../db');

router.use(session({
    secret: 'secret',
    name: 'session_id',
    saveUninitialized: false,
    resave: true,
    cookie  : { maxAge  : new Date(Date.now() + (60 * 1000 * 30 *3)) }
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/', function(req, res, next) {
  res.render('login-error', {  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/library',
    failureRedirect: '/login'})
);

passport.serializeUser(function(user, done){
    done(null, user.idusers);
});

passport.deserializeUser(function(user, done){
    db.query("SELECT * FROM users WHERE idusers=" + user.idusers, function (err, result){
        done(err, result);
    });
});

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },

    function (req, username, password, done) {

        if (!username || !password) {
            return done(null, false);
        }
        console.log(username);
        console.log(password);


        const sql = `SELECT * FROM users WHERE email="${req.body.email}" and password="${req.body.password}";`;

        db.query(sql, function (err, result) {

            if (err) return done(err);

            if (!result.length) {
                return done(null, false);
            }

            var encPassword = req.body.password;
            var dbPassword = result[0].password;

            if (!(dbPassword === encPassword)) {
                return done(null, false);
            }

            console.log(result[0]);

            return done(null, result[0]);
        });
    }
));

module.exports = router;

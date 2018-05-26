const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authenticationMiddleware = require('./middleware');
const db = require('../db');

passport.serializeUser(function(user, done){
    done(null, user.idusers);
});

passport.deserializeUser(function(user, done){
    db.query("SELECT * FROM users WHERE idusers=" + user, function (err, user){
        done(err, user);
    });
});

function initPassport() {

    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        function (req, username, password, done) {
            if (!username || !password) {
                return done(null, false);
            }

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

                return done(null, result[0]);
            });
        }
    ));

    passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;
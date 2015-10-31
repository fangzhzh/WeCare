// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var RunKeeperStrategy = require('passport-runkeeper').Strategy;
var jobs = require('../jobs/jobs');

// load up the user model
var User       = require('../model/dbuser');
var Agenda = require('agenda');
var agenda = new Agenda({db: {address: "mongodb://localhost/wecare"}});

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'userId' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        
                        // create the user
                        var newUser            = new User();

                        newUser.userId    = email;
                        newUser.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err) {
                                console.log(err);
                                return done(err);
                            }
                          return done(null, newUser);
                        });
                    }

                });
            // if the user is logged in but has no local account...
            } else if ( !req.user.local.email ) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {

                        var user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            
                            return done(null,user);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            
            // find and assign user from cookie.
            var list = {}
            if(req.headers.cookie) {
                rc = req.headers.cookie;
                rc && rc.split(';').forEach(function( cookie ) {
                    var parts = cookie.split('=');
                    list[parts.shift().trim()] = decodeURI(parts.join('='));
                });
            }

            var cookieId = list.userid;           
            // check if the user is already logged in
            if (!req.user) {
                
                User.findOne({ 'userId' : cookieId }, function(err, user) {
                    if (err)
                        return done(err);
                    console.log(user);
                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        user.google.id    = profile.id;
                        user.google.token = token;
                        user.google.name  = profile.displayName;
                        user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                        user.save(function(err) {
                            if (err) {
                                console.log(err);
                                return done(err);
                            }

                          jobs.fetchGoogleFit(newUser.userId);
                          jobs.makeRecipe(user.userId);
                          return done(null, user);
                        });

                    } else {
                        var newUser = new User();
                        return done(null, newUser);
                    }
                });

            } else {
                console.log('2- HERE!!!');
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }

        });

    }));

    // =========================================================================
    // RUNKEERPER ==============================================================
    // =========================================================================
    passport.use(new RunKeeperStrategy({
        
        clientID        : configAuth.runkeeperAuth.clientID,
        clientSecret    : configAuth.runkeeperAuth.clientSecret,
        callbackURL     : configAuth.runkeeperAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

      },
      function(req, token, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // check if the user is already logged in
            if (!req.user) {

                console.log(profile);

                User.findOne({ 'runkeeper.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.runkeeper.token) {
                            user.runkeeper.token = token;
                            user.runkeeper.name  = profile.displayName;

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser          = new User();

                        newUser.runkeeper.id    = profile.id;
                        newUser.runkeeper.token = token;
                        newUser.runkeeper.name  = profile.displayName;

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session

                user.runkeeper.id    = profile.id;
                user.runkeeper.token = token;
                user.runkeeper.name  = profile.displayName;

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }

        });
      }
    ));
};

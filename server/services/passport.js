const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// Setup options for JWT Strategy
const jwtOptions = {};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if the user ID in the payload exist in our database
    // if it does, call 'done' with that other
    // otherwese, call done without a user object
    User.findById(payload.sub, function() {
        if(err) { return done(err, false); }

        if( user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// Tell Passport to use this strategy
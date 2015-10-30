// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : 'your-secret-clientID-here', // your App ID
        'clientSecret'    : 'your-client-secret-here', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '764657221684-6ugvp741pa6uhlrd2fs0rsaqp02c9efo.apps.googleusercontent.com',
        'clientSecret'     : 'bq9vzbX2nNjAJ-22sKa9D2iM',
        'callbackURL'      : 'http://woai-baby.com/login/google/callback'
    },

    'runkeeperAuth' : {
        'clientID'         : '4fa934fa4486422bb9494924d143d0e1',
        'clientSecret'     : 'f88cae67769d49ecaf392e065a02906b',
        'callbackURL'      : 'http://localhost:8080/auth/runkeeper/callback'
    }

};

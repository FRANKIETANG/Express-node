var express = require('express');
var router = express.Router();

// login
const passport = require("passport")
const GitHubStrategy = require("passport-github").Strategy

passport.serializeUser((user, done) => {
    // console.log('---serializeUser---')
    // console.log(user)
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    // console.log('---deserializeUser---')
    // console.log(obj)
    done(null, obj)
})

passport.use(new GitHubStrategy({
    clientID: 'd4c89c6ad286cdb9be1d',
    clientSecret: '647d44f73eec4f98eba420abcc84c8c4a9d41263',
    // callbackURL: "https://express-node.now.sh/auth/github/callback"
    callbackURL: "http://localhost:3456/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //     return cb(err, user);
    // });
    done(null, profile)
}));

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home. 
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        }
        res.redirect('/');
    });

module.exports = router;

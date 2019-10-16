const express = require('express');
const router = express.Router();
const passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET user profile. */
router.get('/me', function(req, res, next) {
  passport.authenticate('jwt', {session: false}, (err, user) => {
    console.log(err);
    console.log(user);
    if (err) {
      res.json({"error": err});
    }
    res.json(user);
  })(req, res, next);
});
module.exports = router;

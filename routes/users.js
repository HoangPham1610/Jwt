const express = require('express');
const router = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const userModel = require('../model/UserModel');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* POST login. */
router.post('/login', function (req, res, next) {

  passport.authenticate('local', {session: false}, (err, user, info) => {
      console.log('user auth: ', user);
      console.log('err: ', err);
      console.log('info: ', info);
      if (err || !user) {
          return res.status(400).json({
              message: info ? info.message : 'Login failed',
              user   : user
          });
      }

      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }

          const token = jwt.sign(user, 'your_jwt_secret');
          // const token = jwt.sign({
          //     data: user
          //   }, 'secret', { expiresIn: 60 * 60 });
          return res.json({user, token});
      });
  })
  (req, res);

});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    return userModel.registerUser(username, password)
      .then(result => {
        res.json({"message": "register user success"});
      })
      .catch(err => {
        console.log(err);
        res.json({"error": "register user failure"});
    });
}); 



module.exports = router;

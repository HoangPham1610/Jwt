const express = require('express');
const router  = express.Router();

const jwt      = require('jsonwebtoken');
const passport = require('passport');


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

module.exports = router;
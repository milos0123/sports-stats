import express from 'express';
import passport from 'passport';

const router = express.Router();

router.route('/')
    .get(passport.authenticate('google', { scope: ['email', 'profile'] }))

router.route('/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure',
        failureFlash: true
    }))

router.route('/success')
    .get((req, res) => {
        if (req.user) {
            if (!req.user.googleId) {
                req.logout()
                res.status(400).json('Your Google Account is not linked, please Log In using your your password')
            } else {
                res.status(200).json("success from google")
            }
        } else {
            const msg = 'Please Log In/Sign Up';
            throw new ExpressError(msg, 400)
        }
    })

router.route('/failure')
    .get((req, res) => {
        res.status(400).json('Google registration failed')
    })

export default router;


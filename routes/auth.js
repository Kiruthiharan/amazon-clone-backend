const router = require('express').Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');

// signup
router.post('/auth/signup', async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, message: "Please enter email and password"})
    }
    else{
        try {
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            
            await newUser.save();
            let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
                expiresIn: 604800 //1 week
            });

            res.json({
                success: true,
                message: "Successfully created a new User",
                token:token
            })
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            })
        }
    }
})

module.exports = router;
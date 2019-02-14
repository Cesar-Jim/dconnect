// Anything that has to do with authentication goes here

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../models/User');

// @route:  GET api/users/test
// @desc:   Tests users route
// @access: Public
router.get('/test', (req, res) => res.json({ msg: "Users Works" }));


// @route:  GET api/users/register
// @desc:   Register a user
// @access: Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }) // Check if the email already exists in the database
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });

      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg',  // Rating
          d: 'mm'   // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => { // A salt is random text added to the string to be hashed
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash; // Set this new user's password to the hash
            newUser.save() // save the hash using mongoose
              .then(user => res.json(user)) // Respond with the user if no error
              .catch(err => console.log(err))
          })
        })
      }
    });
});

module.exports = router;
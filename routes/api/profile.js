// Fetch and create users profiles
// Holds things like Location, bio, education, etc.

const express = require('express');
const router = express.Router();

// @route:  GET api/profile/test
// @desc:   Tests profile route
// @access: Public
router.get('/test', (req, res) => res.json({ msg: "Profile Works" }));

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const genToken = require('../auth/generateToken');
const vRoute = require('../middleware/verifiedRoutes');
const vAccess = require('../middleware/verifiedAccess');

const User = require('../users/model');

router.post('/register', vAccess, async (req, res) => {
    let { body } = req.body;
    const { firstname, lastname, email, username, password } = body;
    if (!firstname || !lastname || !email || !username || !password) {
      res.status(400).json({ message: 'Please fill out all fields: Required' });
    }

    const hash = bcrypt.hashSync(password, 12);
    body.password = hash;
  
    try {
      const user = await User.addUser(body);
      const token = genToken(user);
      res.status(201).json({ user, token });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const genToken = require('../auth/generateToken');
const vRoute = require('../middleware/verifiedRoutes');
const vAccess = require('../middleware/verifiedAccess');

const User = require('../users/model');

router.post('/register', async (req, res) => {
  console.log('firstname', req.body.firstname);
    let body = req.body;

    // request: {
    //   body: {
    //     body: {}
    //   }
    // }

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


  router.get('/all', (req, res) => {
    User.findUserBy()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({error: "The posts information could not be retrieved. TEST", error:err});
    })
  });



module.exports = router;
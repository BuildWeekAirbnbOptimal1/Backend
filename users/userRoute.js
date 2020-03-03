const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const genToken = require('../auth/generateToken');
const vRoute = require('../middleware/verifiedRoutes');
const vAccess = require('../middleware/verifiedAccess');
// const vToken = require('../middleware/verifiedToken');

const User = require('../users/model');

// POST

router.post('/register', async (req, res) => {
  console.log('firstname', req.body.firstname);
    let body = req.body;

    let { firstname, lastname, email, username, password } = body;
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

  // LOGIN

router.post('/login', (req, res) => {
  let {username, password} = req.body;

  User.findBy({username})
  .first()
  .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
          const token = genToken(user);

          res.status(200).json({username: user.username, token: token})
      } else {
          res.status(401).json({message: "invalid credits"})
      }
  }).catch(error => {
      res.status(500).json(error);
  })

})


// for my own testing below
 router.get('/:id', async (req, res) => {

  User.findById(req.params.id)
  .then(user => {
    if(user){
      res.status(200).json({success:true, user})
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist."})
    }
  })
  .catch(err => {
    res.status(500).json({error: "The post information could not be retrieved.", error:err});
  })
});


//  DELETE

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await User.deleteUser(id);

    res.status(200).json({
      message: 'Your account has been deleted successfully '
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server Error' });
  }
});


// -------

// router.get("/all",vToken, vRoute('Admin'), (req, res) => {
//   Users.find().then(users => {
//       res.json(users)
//   }).catch(error => {
//       res.send(error);
//       console.log(error)
//   })
// })


module.exports = router;
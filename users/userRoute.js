const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const genToken = require("../auth/generateToken");
const vRoute = require("../middleware/verifiedRoutes");
const vAccess = require("../middleware/verifiedAccess");
const vToken = require('../middleware/verifiedToken');

const User = require("../users/model");

// POST

router.post("/register", async (req, res) => {
  console.log("firstname", req.body.firstname);
  let body = req.body;

  let { firstname, lastname, email, username, password } = body;
  if (!firstname || !lastname || !email || !username || !password) {
    res.status(400).json({ message: "Please fill out all fields: Required" });
  }

  const hash = bcrypt.hashSync(password, 12);
  body.password = hash;

  try {
    const user = await User.addUser(body);
    const token = genToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// LOGIN

router.post("/login",vToken, (req, res) => {
  let { username, password } = req.body;

  User.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);

        res.status(200).json({ userId: user.id, username: user.username, token: token});
      } else {
        res.status(401).json({ message: "invalid credits" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });

    
});

// GET/:id

router.get("/:id",vToken, async (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "The post information could not be retrieved.",
          error: err
        });
    });
});

//  DELETE

router.delete("/:id",vAccess, async (req, res) => {
  const id = req.params.id;
  try {
    await User.deleteUser(id);

    res.status(200).json({
      message: "Your account has been deleted successfully "
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server Error" });
  }
});

// PUT

router.put("/:id",vAccess, async (req, res) => {
  const id = req.params.id;
  const { body } = req;
  const { password } = body;

  if (password) {
    hash = bcrypt.hashSync(password, 12);
    body.password = hash;
  }

  try {
    const user = await User.updateUser(id, body);

    const userChange = new Object({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username
    });

    res.status(201).json({
      userChange,
      message: "Account info updated successfully!!"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

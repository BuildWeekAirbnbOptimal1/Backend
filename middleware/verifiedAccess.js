// checking if the account is in use already? 
const User = require('../users/model')

module.exports = verifiedAccess = async (req, res, next) => {

    if (!req.params.hasOwnProperty('id')) {
      // this method returns a boolean indicating whether 
      //the object has the specified property as its own property (as opposed to inheriting it).
      const { username, email } = req.body;
      try {
        //  check the database for the username
        const user = await User.findBy({ username });
        //   check the database for the email
        const mail = await User.findBy({ email });
  
        // if either the username or email return a positive, reject it
        if (user || mail) {
          user
            ? res.status(400).json({ message: 'Username is already in use' })
            : res.status(400).json({ message: 'Email is already in use' });
        }
  
        next();
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      next();
    }
  };
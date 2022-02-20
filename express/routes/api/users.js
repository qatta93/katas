const express = require('express');
const router = express.Router();
const users = require('../../Users');
const uuid = require('uuid');


// get all users
router.get('/', (__, res) => res.json(users)); 

// get single user
router.get('/:id', (req, res) => {
  // some returns true or false
const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: 'User not found '});
  }
});

//create new user
router.post('/', (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if(!newUser.name || !newUser.email) {
    return res.status(400).json({ msg: 'Please provide a name and email' });
  }

  users.push(newUser);
  res.json(users);
});

// update single user
router.get('/:id', (req, res) => {
const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
   const updateUser = req.body;
   users.forEach(user => {
     if(user.id === parseInt(req.params.id)) {
       user.name = req.body.name ? updateUser.name : user.name;
       user.email = req.body.e ? updateUser.email : user.email;
       
       res.json({ msg: 'user updated', user})
      }
   })
  } else {
    res.status(400).json({ msg: `No user with id of ${req.params.id} found`});
  }
});

// delete single user
router.get('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
      res.json({ 
        msg: 'user deleted', 
        users: users.filter(user => user.id !== parseInt(req.params.id))
      });
    } else {
      res.status(400).json({ msg: `No user with id of ${req.params.id} found`});
    }
  });

module.exports = router;
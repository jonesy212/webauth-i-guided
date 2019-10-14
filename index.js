const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {
  let user = req.body;


  //validate the user 

  //hash the password

  // we override the password with the hash
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


//localhost:5000/api/login
server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  if(username && password){
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bycrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
  }else{
    res.status(400).json({message: 'please proivde credentials'});
  }
});

server.get('/api/users', protected, (req, res) => {
  
  let {username, password} = req.headers;

  if (username && password){
  Users.find({username})
    .then(users => {
      if(user && bycrypt.compareSync(password, users.password)){
        res.json(users);
      } else {
        res.status(401).json({message: 'Invalid Credentials'});
      }
    });
  }else{
    .catch(err => res.send(err));
  }
})



server.get('/hash', (req, res) => {
  //npmjs.com/package/bycryptsjs
  // read a password from the Authorization header
  const password = req.headers.authorization;

  // tht 8 is how we slow down attackers trying to pre-genera hashes
const hash = bycrypt.hashSync(password, 8);// the 8 is the number of round 2^8
//another good stargin value is 14


if (password ) {
res.status(200).json({hash});
  // return an object with the password hashed using bcryptjs
  // { hash: '970(&(:OHKJHIY*HJKH(*^)*&YLKJBLKJGHIUGH(*P' }
} else{
  res.status(400).json({message})
  }
});

function protected(){

}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

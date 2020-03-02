const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('../users/userRoute');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/user', userRouter);


server.get('/user', (req, res) => {
    res.send(`
      <h2>welcome to project TEST</h>

    `);
});




module.exports = server;
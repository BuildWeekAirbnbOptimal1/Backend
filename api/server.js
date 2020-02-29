const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('../users/userRoute');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/user', userRouter);





module.exports = server;
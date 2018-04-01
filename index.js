'use strict';

const express = require('express');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
// const userRouter = require('./route/user-router.js');



const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);



// app.use(userRouter);
const server = app.listen(PORT, () => console.log(`http//localhost:${PORT}`));
server.ixRunning = true;
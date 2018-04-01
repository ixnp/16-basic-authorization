'use strict';

const express = require('express');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const morgan = require('morgan')
const errors = require('./lib/error-middlewear.js');
const userRouter = require('./route/user-router.js');



// const userRouter = require('./route/user-router.js');

dotenv.load();


const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(userRouter);
app.use(errors);
app.listen(PORT, () => console.log(`http//localhost:${PORT}`));

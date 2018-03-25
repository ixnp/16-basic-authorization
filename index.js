'use strict';
const express = require('express');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const userRouter = require('./route/user-router.js');
mongoose.connect('mongodb://localhost/lab16basicAuth');


const app = express();

app.use(userRouter);
app.listen(PORT, () => console.log(`http//localhost:${PORT}`));
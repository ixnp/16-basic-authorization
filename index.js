const express = require('express');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./model/userSchema.js');

mongoose.connect('mongodb://localhost/lab16basicAuth');

const app = express();
//User Model


const router = express.Router();
router.get('/signin',(req, res)=>{
    res.send('hi');
});

router.post('/signup', express.json(), (req, res) => {
    User.create(req.body)
    .then(() => res.sendStatus(200))
    .catch(()=> res.sendStatus(400))
});

app.use('/api', router);
app.listen(PORT, () => console.log('http//localhost:'+PORT));
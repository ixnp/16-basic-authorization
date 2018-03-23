const express = require('express');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lab16basicAuth');

const app = express();
//User Model
const schema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{//TODO: hash
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', schema);

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
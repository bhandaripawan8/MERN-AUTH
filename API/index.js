const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')


app.use(cors());
app.use(express.json());

app.listen(3001 , () =>{
    console.log('listening to port 3000')
})

// mongoose.connect('mongodb link')

app.post('/api/registration', async (req, res)=>{
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.send(user)
    } catch (err) {
        console.log(err);
    }
    
    // res.send('this is registration')
    res.send('status ok')
    console.log(req.body)
})
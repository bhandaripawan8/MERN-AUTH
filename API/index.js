const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/User.js');

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log('listening to port 3001');
});


const mongoUrl = 'mongodb+srv://pawanb78:xkKNHL8vvsY4d246@cluster0.gkafhn9.mongodb.net/mern-auth';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Connection error:', err);
});
db.once('open', () => {
    console.log('Connection successful');
});


app.post('/api/registration', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ status: 'error', error: 'Email already exists' });
        }
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});



app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
        if (user) {
            res.json({ status: 'ok' });
        } else {
            res.json({ status: 'error', error: 'invalid credentials' });
        }
    } catch (err) {
        res.json({ status: 'error', error: 'unexpected error' });
    }
});

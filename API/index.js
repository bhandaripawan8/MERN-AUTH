const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/User.js');
const jwt = require('jsonwebtoken');

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
            return res.status(400).json({ status: 'error', error: 'Email already exists, please log in'});
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
	const user = await User.findOne({
		email: req.body.email,
	})
	if (!user) {
		return res.json({ status: 'error', error: 'Invalid login' })
	}
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)
		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)
		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

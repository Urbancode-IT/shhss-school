const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

// MongoDB connection using the URI from the .env file
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('Error: MONGODB_URI is not defined in the .env file.');
    process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error:', err));

// Donor schema (for donation-related operations)
const donorSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    donationAmount: Number,
    paymentMethod: String,
    category: String,
    paymentDate: { type: Date, default: Date.now }
});

// Donor model
const Donor = mongoose.model('Donor', donorSchema);

// Event Registration Schema (for event registration operations)
const registrationSchema = new mongoose.Schema({
    name: String,
    age: Number,
    phone: String,
    event: String,
    teamNumber: Number,
    teamName: String,
    members: [String],
    date: { type: Date, default: Date.now }
});

// Contact schema
const contactSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// Models
const Registration = mongoose.model('Registration', registrationSchema);
const Contact = mongoose.model('Contact', contactSchema);

// POST route to handle new donor form submission
app.post('/donors', async (req, res) => {
    try {
        const { name, email, phone, company, donationAmount, paymentMethod, category } = req.body;
        const donor = new Donor({ name, email, phone, company, donationAmount, paymentMethod, category });
        await donor.save();
        res.status(201).send(donor);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// GET route to fetch donor data, sorted by the latest donation first
app.get('/donors', async (req, res) => {
    try {
        const donors = await Donor.find({}, 'name company donationAmount category paymentDate').sort({ paymentDate: -1 });
        res.status(200).json(donors);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST route to handle new registrations
app.post('/register', async (req, res) => {
    try {
        const { name, age, phone, event, teamNumber, teamName, members } = req.body;
        const newRegistration = new Registration({ name, age, phone, event, teamNumber, teamName, members });
        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting registration', error });
    }
});

// GET route to fetch all registrations
app.get('/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find(); // Fetch all registrations from the database
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching registrations', error });
    }
});

// POST route to handle new contact form submissions
app.post('/contact', async (req, res) => {
    try {
        const { firstname, lastname, email, message } = req.body;
        const newContact = new Contact({ firstname, lastname, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message Sent Successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting message', error });
    }
});

// GET route to fetch all contacts
app.get('/contactfrom', async (req, res) => {
    try {
        const contacts = await Contact.find(); // Fetch all contacts from the database
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
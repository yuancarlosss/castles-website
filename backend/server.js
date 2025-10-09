const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_URI;
console.log('MONGO_URI:', uri); // Debug: Log the URI (remove in production)
const client = new MongoClient(uri);

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const db = client.db('contactDB');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections); // Debug: List collections
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
}

connectToDB();

// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const database = client.db('contactDB');
    const collection = database.collection('contactForm');

    const formData = {
      fullName: req.body.fullName,
      email: req.body.email,
      mobile: req.body.mobile || '',
      company: req.body.company || '',
      subject: req.body.subject,
      message: req.body.message,
      submittedAt: new Date(req.body.submittedAt)
    };

    const result = await collection.insertOne(formData);
    res.status(200).json({ message: 'Form data saved successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving form data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
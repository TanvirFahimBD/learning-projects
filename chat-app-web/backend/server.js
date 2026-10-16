const express = require('express');
const {chats} = require('./data/data');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./controllers/middleware/errorMiddleware');
const app = express();
dotenv.config();
// app.use(cors());

connectDB(); // Call the connectDB function to establish a connection to the database

const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON request bodies

// Sample route
app.get('/', (req, res) => {
  res.send('Api is running...');
});

app.get('/api/chat', (req, res) => {
  res.send(chats);    
});

app.get('/api/chat/:id', (req, res) => {
  const chat = chats.find(c => c._id === req.params.id);
  if (!chat) {
    return res.status(404).send('Chat not found');
  }
  res.send(chat);
});

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
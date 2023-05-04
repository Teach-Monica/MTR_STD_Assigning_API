const express = require('express');
const studentRoutes = require('./routes/student');
const mentorRoutes = require('./routes/mentor');
const dbConfig = require('./dbconfig');
const cors = require("cors");

const app = express();
const port = 3000;

// Set up middleware
app.use(express.json());

// Register routes
app.use('/api', studentRoutes);
app.use('/api', mentorRoutes);

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));

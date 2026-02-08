const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const studentRoutes = require('./routes/studentRoutes');

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/student', studentRoutes);


// Error handler (last)
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
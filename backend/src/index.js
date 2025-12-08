require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
app.use(cors());
app.use(express.json());

console.log("MONGO_URI:", process.env.MONGO_URI); // debug

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/sales', salesRoutes);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

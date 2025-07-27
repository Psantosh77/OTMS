
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/otgms';

function connectDB() {
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = connectDB;
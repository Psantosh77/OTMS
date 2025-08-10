
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/otgms';

console.log('MongoDB Connection Details:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- MONGO_URI available:', !!process.env.MONGO_URI);
console.log('- Using URI:', mongoUri.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB');

async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    const connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      connectTimeoutMS: 10000, // 10 second timeout
    });

    console.log('✅ MongoDB connected successfully!');
    console.log('- Host:', connection.connection.host);
    console.log('- Database:', connection.connection.name);
    console.log('- Port:', connection.connection.port);
    
    return connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('- Error message:', error.message);
    console.error('- Error code:', error.code);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n🔍 Troubleshooting:');
      console.error('- Check if MongoDB service is running');
      console.error('- Verify MONGO_URI in environment file');
      console.error('- For Atlas: Check network access and credentials');
    }
    
    process.exit(1);
  }
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});



mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;
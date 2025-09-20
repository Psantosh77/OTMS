// Load environment variables based on NODE_ENV
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`)
});

// Fallback to default .env if environment-specific file doesn't exist
if (!process.env.MONGO_URI) {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const winston = require('winston');
//const path = require('path');
const { sendResponse } = require('./utils/response');
const connectDB = require('./database/mongodb');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth/login');


const dashboardRoutes = require('./routes/Home/FaqRoutes');
const carManufacturerRoutes = require('./routes/carDataRoutes');
const userRoutes = require('./routes/updateUserRoutes');
const orderRoutes = require('./routes/orderRoutes');
const FaqRoutes = require('./routes/Home/FaqRoutes');
const serviceRoutes = require('./routes/serviceRoute/serviceRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const LocationRoutes = require('./routes/Location/locationRoutes');



const app = express();
const port = process.env.PORT || 9000;

// Configure Winston logger for development
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: []
});

// Add file transport in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.File({
    filename: path.join(__dirname, '../logs/app.log'),
    level: 'info'
  }));
  logger.add(new winston.transports.File({
    filename: path.join(__dirname, '../logs/error.log'),
    level: 'error'
  }));
}

// Always add console transport
logger.add(new winston.transports.Console());

// Allowed IPs (comma separated in .env, e.g. ALLOWED_IPS=127.0.0.1,192.168.1.10)
const allowedIps = (process.env.ALLOWED_IPS || '').split(',').map(ip => ip.trim()).filter(ip => ip);

// IP restriction middleware
app.use((req, res, next) => {
  //   const clientIp = req.ip.replace('::ffff:', ''); // Handles IPv4-mapped IPv6 addresses
  //   if (allowedIps.length === 0 || allowedIps.includes(clientIp)) {
    //     return next();
    //   }
    //   res.status(403).json({ error: 'Access denied: IP not allowed.' });
    return next();
  });
  
  // Middleware
  app.use(express.json());
  app.use(cookieParser());
app.use(cors({
  // origin: process.env.NODE_ENV === 'production' 
  //   ? process.env.FRONTEND_URL || true 
  //   : true, // Allow all origins in development
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));





// Routes

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cardata', carManufacturerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/faq', FaqRoutes );
app.use('/api/services', serviceRoutes );
app.use('/api/vendor', vendorRoutes );
app.use('/api/location', LocationRoutes);

// Health check route for Render
app.get('/health', (req, res) => {
  sendResponse(res, {
    message: 'Server is healthy',
    data: { status: 'OK', timestamp: new Date().toISOString() },
    status: 200
  });
});

// Environment validation
console.log('🚀 Starting OTGMS Backend Server...');
console.log('📋 Environment Check:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('- PORT:', process.env.PORT || 'not set (using default 9000)');
console.log('- MONGO_URI:', process.env.MONGO_URI ? '✅ Set' : '❌ Not set');
console.log('- FRONTEND_URL:', process.env.FRONTEND_URL || 'not set');

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`  - ${envVar}`));
  console.error('\n💡 Make sure you have a .env file in the Backend directory with all required variables.');
  process.exit(1);
}

// Basic route
app.get('/', (req, res) => {
  sendResponse(res, {
    message: 'Hello, Express server is running!',
    data: { 
      env: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      mongoStatus: 'connected'
    },
    status: 200
  });
});

// Connect to database and start server
console.log('\n🔌 Connecting to MongoDB...');
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`\n✅ Server successfully started!`);
      console.log(`🌐 Server running on: http://localhost:${port}`);
      console.log(`🏠 Health check: http://localhost:${port}/health`);
      console.log(`📊 API base URL: http://localhost:${port}/api`);
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('\n❌ Failed to start server:');
    console.error('Error:', err.message);
    logger.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });


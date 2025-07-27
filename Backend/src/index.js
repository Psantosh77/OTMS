require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const winston = require('winston');
const path = require('path');
const { sendResponse } = require('./utils/response');
const connectDB = require('./database/mongodb');
const authRoutes = require('./routes/auth/login');

const dashboardRoutes = require('./routes/Home/index');


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

// Health check route for Render
app.get('/health', (req, res) => {
  sendResponse(res, {
    message: 'Server is healthy',
    data: { status: 'OK', timestamp: new Date().toISOString() },
    status: 200
  });
});

// Basic route
app.get('/', (req, res) => {
  sendResponse(res, {
    message: 'Hello, Express server is running!',
    data: { env: process.env.NODE_ENV },
    status: 200
  });
});

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    logger.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
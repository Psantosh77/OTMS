# OTGMS (On-The-Go Maintenance Services)

A comprehensive vehicle maintenance and service platform with separate frontend and backend applications.

## Project Structure

```
OTGMSV3/
├── Backend/           # Node.js Express API
├── Frontend/          # React Vite Application
└── README.md         # This file
```

## Backend Setup

### Prerequisites
- Node.js (>=16.0.0)
- MongoDB
- npm or yarn

### Environment Configuration

1. Copy the environment example file:
   ```bash
   cd Backend
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=9000
   MONGO_URI=mongodb://localhost:27017/otgms
   ACCESS_TOKEN_SECRET=your_super_secure_access_token_secret
   REFRESH_TOKEN_SECRET=your_super_secure_refresh_token_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   FRONTEND_URL=http://localhost:5173
   ```

### Installation & Running

```bash
cd Backend
npm install
npm run dev          # Development mode
npm start           # Production mode
```

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run dev:prod` - Start development server in production mode

## Frontend Setup

### Prerequisites
- Node.js (>=16.0.0)
- npm or yarn

### Environment Configuration

1. Copy the environment example file:
   ```bash
   cd Frontend
   cp .env.example .env.development
   ```

2. Update the environment file:
   ```env
   VITE_API_BASE_URL=http://localhost:9000/api
   VITE_APP_NAME=OTGMS
   VITE_NODE_ENV=development
   ```

### Installation & Running

```bash
cd Frontend
npm install
npm run dev          # Development mode
npm run build        # Build for production
npm run preview      # Preview production build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Production Deployment

### Backend (Render)

1. Update the `render.yaml` file with your production environment variables
2. Set the following environment variables in Render dashboard:
   - `MONGO_URI` - Your MongoDB connection string
   - `EMAIL_USER` - Your email for OTP services
   - `EMAIL_PASS` - Your email app password
   - `FRONTEND_URL` - Your frontend domain URL

### Frontend (Vercel/Netlify)

1. Create a `.env.production` file:
   ```env
   VITE_API_BASE_URL=https://your-backend-domain.com/api
   VITE_NODE_ENV=production
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to your hosting service

## Environment Variables

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | development | No |
| `PORT` | Server port | 9000 | No |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/otgms | Yes |
| `ACCESS_TOKEN_SECRET` | JWT access token secret | - | Yes |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret | - | Yes |
| `EMAIL_USER` | Email for OTP services | - | Yes |
| `EMAIL_PASS` | Email app password | - | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | - | Yes |
| `APP_NAME` | Application name | OTGMS | No |
| `SUPPORT_EMAIL` | Support email | support@otgms.com | No |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API URL | http://localhost:9000/api | Yes |
| `VITE_API_TIMEOUT` | API request timeout | 10000 | No |
| `VITE_APP_NAME` | Application name | OTGMS | No |
| `VITE_NODE_ENV` | Environment mode | development | No |

## Features

- User authentication with OTP verification
- Role-based access (Admin, Vendor, Client)
- Vehicle management
- Service booking system
- Dashboard for different user roles
- Real-time location services
- Email notifications

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Nodemailer for emails
- Axios for external APIs

### Frontend
- React 19
- Vite
- React Router DOM
- Axios for API calls
- Tailwind CSS
- Bootstrap

## API Documentation

### Authentication Endpoints
- `POST /api/auth/sendotp` - Send OTP for login
- `POST /api/auth/verifyOpt` - Verify OTP and login
- `POST /api/auth/logout` - Logout user

### User Management
- `PUT /api/auth/updateuser` - Update user information
- `GET /api/auth/carbrandsmodels` - Get car brands and models

### Dashboard
- `POST /api/dashboard/config` - Get user configuration and location data

## Development Guidelines

1. Always use environment variables for sensitive data
2. Follow the existing code structure and naming conventions
3. Test API endpoints with different user roles
4. Ensure CORS is properly configured for your frontend domain
5. Use proper error handling and response formatting
6. Keep dependencies up to date

## Troubleshooting

### Common Issues

1. **CORS errors**: Update `FRONTEND_URL` in backend `.env`
2. **MongoDB connection**: Check `MONGO_URI` format and database access
3. **Email OTP not working**: Verify `EMAIL_USER` and `EMAIL_PASS` settings
4. **JWT token errors**: Ensure `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` are set

### Development Tips

- Use `npm run dev` for backend development with auto-reload
- Check browser console and network tab for frontend issues
- Use MongoDB Compass to inspect database collections
- Enable detailed logging by setting `LOG_LEVEL=debug`

## License

This project is proprietary and confidential.

## Support

For support, email support@otgms.com or create an issue in the repository.

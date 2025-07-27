# Production Deployment Checklist

## Pre-Deployment Checklist

### Security
- [ ] Change default JWT secrets in production `.env`
- [ ] Use strong, unique passwords for all accounts
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure proper CORS origins (no wildcards in production)
- [ ] Review and configure allowed IPs if needed
- [ ] Remove or disable development/debug endpoints
- [ ] Set secure cookie flags (`secure: true` in production)

### Environment Configuration
- [ ] Backend `.env` file configured with production values
- [ ] Frontend `.env.production` file configured
- [ ] Database connection string updated for production
- [ ] Email service credentials configured
- [ ] External API endpoints verified

### Database
- [ ] MongoDB production instance ready
- [ ] Database connection tested
- [ ] Database indexes created for performance
- [ ] Backup strategy implemented
- [ ] Database access restricted to application servers

### Performance
- [ ] Enable gzip compression (handled by nginx in Docker setup)
- [ ] Configure static asset caching
- [ ] Optimize bundle size (handled by Vite build)
- [ ] Database queries optimized
- [ ] Rate limiting configured if needed

### Monitoring & Logging
- [ ] Application logging configured
- [ ] Error tracking service integrated (optional)
- [ ] Performance monitoring setup (optional)
- [ ] Health check endpoints working
- [ ] Uptime monitoring configured

## Deployment Steps

### Option 1: Manual Deployment

#### Backend (Node.js)
1. [ ] Clone/upload code to production server
2. [ ] Install Node.js (>=16.0.0)
3. [ ] Copy `.env.example` to `.env` and configure
4. [ ] Run `npm ci --production`
5. [ ] Test with `npm start`
6. [ ] Configure process manager (PM2, forever, etc.)
7. [ ] Configure reverse proxy (nginx, Apache)
8. [ ] Test health endpoint: `/health`

#### Frontend (Static Files)
1. [ ] Copy `.env.example` to `.env.production` and configure
2. [ ] Run `npm ci`
3. [ ] Run `npm run build`
4. [ ] Upload `dist/` folder to web server
5. [ ] Configure web server (nginx, Apache) for SPA routing
6. [ ] Test application in browser

### Option 2: Docker Deployment
1. [ ] Install Docker and Docker Compose
2. [ ] Configure environment files
3. [ ] Run `docker-compose up --build -d`
4. [ ] Verify all containers are running
5. [ ] Test application endpoints

### Option 3: Render Deployment (Backend)
1. [ ] Connect GitHub repository to Render
2. [ ] Configure environment variables in Render dashboard:
   - [ ] `MONGO_URI`
   - [ ] `ACCESS_TOKEN_SECRET`
   - [ ] `REFRESH_TOKEN_SECRET` 
   - [ ] `EMAIL_USER`
   - [ ] `EMAIL_PASS`
   - [ ] `FRONTEND_URL`
3. [ ] Deploy from `render.yaml` configuration
4. [ ] Test deployed backend API

### Option 4: Vercel/Netlify Deployment (Frontend)
1. [ ] Connect GitHub repository
2. [ ] Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. [ ] Configure environment variables
4. [ ] Deploy and test

## Post-Deployment Verification

### Functional Testing
- [ ] User registration flow works
- [ ] OTP email delivery works
- [ ] User login/logout works
- [ ] API endpoints respond correctly
- [ ] File uploads work (if applicable)
- [ ] External API integrations work

### Performance Testing
- [ ] Page load times acceptable (<3 seconds)
- [ ] API response times acceptable (<1 second)
- [ ] Database queries perform well
- [ ] Static assets load quickly

### Security Testing
- [ ] HTTPS redirect works
- [ ] Security headers present
- [ ] No sensitive data in client-side code
- [ ] JWT tokens expire correctly
- [ ] Rate limiting works (if configured)

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (if relevant)
- [ ] Edge (latest)
- [ ] Mobile browsers

## Maintenance Tasks

### Regular Tasks
- [ ] Monitor application logs
- [ ] Check database performance
- [ ] Update dependencies (security patches)
- [ ] Monitor disk space and memory usage
- [ ] Backup database regularly

### Security Updates
- [ ] Review and rotate JWT secrets periodically
- [ ] Update Node.js version
- [ ] Update npm packages (especially security updates)
- [ ] Review access logs for suspicious activity

## Rollback Plan

### If Deployment Fails
1. [ ] Keep previous version available
2. [ ] Document rollback procedure
3. [ ] Test rollback in staging environment
4. [ ] Have database backup ready
5. [ ] Communicate with stakeholders

### Emergency Contacts
- [ ] Development team contacts
- [ ] Infrastructure team contacts
- [ ] Database administrator
- [ ] Domain/DNS provider

## Environment URLs

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:9000

### Production
- Frontend: https://your-frontend-domain.com
- Backend: https://your-backend-domain.com
- Database: (Production MongoDB URI)

## Documentation
- [ ] Update README.md with production URLs
- [ ] Document any production-specific configurations
- [ ] Update API documentation if needed
- [ ] Create troubleshooting guide

---

**Note**: This checklist should be customized based on your specific deployment environment and requirements.

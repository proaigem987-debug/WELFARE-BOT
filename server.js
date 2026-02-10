// ========================================
// WELFARE AI PLATFORM - BACKEND SERVER
// Node.js + Express + SQLite
// ========================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const schemeRoutes = require('./routes/schemes');
const applicationRoutes = require('./routes/applications');
const chatRoutes = require('./routes/chat');
const analyticsRoutes = require('./routes/analytics');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE
// ========================================

// Security headers
app.use(helmet({
    contentSecurityPolicy: false, // Allow inline scripts for frontend
}));

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Serve static files (frontend)
app.use(express.static(path.join(__dirname)));

// ========================================
// API ROUTES
// ========================================

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ========================================
// FRONTEND ROUTES
// ========================================

// Serve frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ========================================
// ERROR HANDLING
// ========================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found',
        path: req.path
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║        🌟 WELFARE AI PLATFORM - BACKEND SERVER 🌟         ║
║                                                            ║
║  Status: ✅ RUNNING                                        ║
║  Port: ${PORT}                                              ║
║  Environment: ${process.env.NODE_ENV || 'development'}                                  ║
║                                                            ║
║  Frontend URLs:                                            ║
║  • Login:     http://localhost:${PORT}/                     ║
║  • Dashboard: http://localhost:${PORT}/dashboard            ║
║  • Chat:      http://localhost:${PORT}/chat                 ║
║                                                            ║
║  API Endpoints:                                            ║
║  • Health:    http://localhost:${PORT}/api/health           ║
║  • Auth:      http://localhost:${PORT}/api/auth             ║
║  • Schemes:   http://localhost:${PORT}/api/schemes          ║
║  • Chat:      http://localhost:${PORT}/api/chat             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    app.close(() => {
        console.log('HTTP server closed');
    });
});

module.exports = app;

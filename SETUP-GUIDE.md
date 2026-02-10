# 🚀 COMPLETE APP SETUP GUIDE
## Welfare AI Platform - Full Stack Application

---

## 📋 TABLE OF CONTENTS
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [API Documentation](#api-documentation)
6. [Frontend-Backend Integration](#frontend-backend-integration)
7. [Testing](#testing)
8. [Deployment](#deployment)

---

## ✅ PREREQUISITES

### Required Software:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional) - [Download](https://git-scm.com/)

### Check Installation:
```bash
node --version
npm --version
```

---

## 📦 INSTALLATION

### Step 1: Install Dependencies
```bash
cd "c:\Users\balam\.gemini\antigravity\scratch\welfare-ai-platform\WELFARE BOT"
npm install
```

This will install:
- `express` - Web framework
- `sqlite3` - Database
- `bcryptjs` - Password hashing
- `jsonwebtoken` - Authentication
- `cors` - Cross-origin requests
- `helmet` - Security headers
- `morgan` - Logging
- And more...

---

## 🗄️ DATABASE SETUP

### Step 2: Initialize Database
```bash
npm run init-db
```

This will:
- ✅ Create `welfare.db` SQLite database
- ✅ Create all tables (users, schemes, applications, etc.)
- ✅ Insert sample welfare schemes data
- ✅ Set up indexes and foreign keys

### Database Schema:
- **users** - User profiles and authentication
- **schemes** - Government welfare schemes (multilingual)
- **applications** - User applications to schemes
- **chat_messages** - AI chatbot conversations
- **user_progress** - Progress tracking (health, housing, employment)
- **achievements** - Gamification badges
- **otp_verifications** - OTP authentication

---

## 🚀 RUNNING THE APPLICATION

### Step 3: Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### Server will start on:
```
http://localhost:3000
```

You'll see:
```
╔════════════════════════════════════════════════════════════╗
║        🌟 WELFARE AI PLATFORM - BACKEND SERVER 🌟         ║
║  Status: ✅ RUNNING                                        ║
║  Port: 3000                                                ║
╚════════════════════════════════════════════════════════════╝
```

---

## 🌐 ACCESS THE APPLICATION

### Frontend Pages:
- **Login Page:** `http://localhost:3000/`
- **Dashboard:** `http://localhost:3000/dashboard`
- **Chat:** `http://localhost:3000/chat`

### API Endpoints:
- **Health Check:** `http://localhost:3000/api/health`
- **API Base:** `http://localhost:3000/api/`

---

## 📚 API DOCUMENTATION

### Authentication Endpoints

#### 1. Send OTP
```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "mobile": "9876543210"
}

Response:
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "123456"  // Only in development
}
```

#### 2. Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "mobile": "9876543210",
  "otp": "123456"
}

Response (Existing User):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "mobile": "9876543210",
    "fullName": "Rajesh Kumar",
    "welfareScore": 78,
    "welfareStars": 125
  },
  "isNewUser": false
}

Response (New User):
{
  "success": true,
  "isNewUser": true,
  "mobile": "9876543210"
}
```

#### 3. Complete Profile (New Users)
```http
POST /api/auth/complete-profile
Content-Type: application/json

{
  "mobile": "9876543210",
  "fullName": "Rajesh Kumar",
  "aadhaar": "123456789012",
  "dob": "1985-05-15",
  "gender": "male",
  "address": "Village Rampur, Dist. Guntur",
  "district": "Guntur",
  "state": "Andhra Pradesh",
  "incomeBracket": "below-50k",
  "familySize": 5
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "mobile": "9876543210",
    "fullName": "Rajesh Kumar",
    "welfareScore": 50,
    "welfareStars": 10
  }
}
```

### Schemes Endpoints

#### 4. Get All Schemes
```http
GET /api/schemes?language=en&category=Housing

Response:
{
  "schemes": [
    {
      "id": 1,
      "schemeId": "pmay",
      "name": "PM Awas Yojana",
      "description": "Housing subsidy for affordable homes",
      "category": "Housing",
      "benefitAmount": 250000,
      "eligibilityCriteria": "EWS/LIG/MIG families...",
      "requiredDocuments": "Aadhaar, Income Certificate...",
      "applicationUrl": "https://pmaymis.gov.in"
    }
  ]
}
```

#### 5. Get Matched Schemes (Authenticated)
```http
GET /api/schemes/matched?language=en
Authorization: Bearer <token>

Response:
{
  "schemes": [
    {
      "id": 1,
      "schemeId": "pmay",
      "name": "PM Awas Yojana",
      "matchScore": 90,
      "benefitAmount": 250000
    }
  ],
  "totalMatches": 5
}
```

### Applications Endpoints

#### 6. Submit Application (Authenticated)
```http
POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "schemeId": 1,
  "matchScore": 90
}

Response:
{
  "success": true,
  "applicationId": 1,
  "applicationNumber": "WEL1707523456789",
  "message": "Application submitted successfully",
  "starsEarned": 10
}
```

#### 7. Get My Applications (Authenticated)
```http
GET /api/applications?language=en
Authorization: Bearer <token>

Response:
{
  "applications": [
    {
      "id": 1,
      "applicationNumber": "WEL1707523456789",
      "schemeName": "PM Awas Yojana",
      "category": "Housing",
      "status": "pending",
      "matchScore": 90,
      "submittedAt": "2026-02-10T00:00:00.000Z"
    }
  ]
}
```

### Chat Endpoints

#### 8. Send Chat Message (Authenticated)
```http
POST /api/chat/message
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "What schemes am I eligible for?",
  "language": "en"
}

Response:
{
  "success": true,
  "response": "Based on your profile, you're eligible for PM Awas Yojana...",
  "sentiment": "neutral",
  "messageId": 1
}
```

#### 9. Get Chat History (Authenticated)
```http
GET /api/chat/history?limit=50
Authorization: Bearer <token>

Response:
{
  "messages": [
    {
      "id": 1,
      "message": "Hello",
      "response": "Hi there! How can I assist you today?",
      "language": "en",
      "sentiment": "positive",
      "created_at": "2026-02-10T00:00:00.000Z"
    }
  ]
}
```

### User Endpoints

#### 10. Get User Profile (Authenticated)
```http
GET /api/users/profile
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": 1,
    "mobile": "9876543210",
    "full_name": "Rajesh Kumar",
    "district": "Guntur",
    "state": "Andhra Pradesh",
    "welfare_score": 78,
    "welfare_stars": 125
  }
}
```

#### 11. Get User Progress (Authenticated)
```http
GET /api/users/progress
Authorization: Bearer <token>

Response:
{
  "progress": [
    {
      "category": "Health",
      "progress_percentage": 100,
      "goal_description": "Get health coverage",
      "completed": true
    },
    {
      "category": "Housing",
      "progress_percentage": 65,
      "completed": false
    }
  ]
}
```

#### 12. Get User Statistics (Authenticated)
```http
GET /api/users/stats
Authorization: Bearer <token>

Response:
{
  "stats": {
    "welfareScore": 78,
    "welfareStars": 125,
    "totalApplications": 3,
    "approvedApplications": 1,
    "pendingApplications": 2,
    "eligibleSchemes": 6,
    "achievementsEarned": 2
  }
}
```

### Analytics Endpoints

#### 13. Get Platform Statistics
```http
GET /api/analytics/platform

Response:
{
  "platform": {
    "totalUsers": 150,
    "totalApplications": 450,
    "approvedApplications": 320,
    "activeSchemes": 6,
    "approvalRate": "71.1"
  }
}
```

---

## 🔗 FRONTEND-BACKEND INTEGRATION

### Update Frontend Files

The frontend files need to be updated to connect to the backend API. Here's how:

### 1. Update `login-script.js`

Replace the OTP sending logic:
```javascript
// OLD: Simulated OTP
// NEW: Real API call
document.getElementById('sendOtpBtn')?.addEventListener('click', async () => {
    const mobile = document.getElementById('mobileInput').value;
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile })
        });
        
        const data = await response.json();
        
        if (data.success) {
            userMobile = mobile;
            goToStep(3);
            startOTPTimer();
            console.log('OTP:', data.otp); // Dev only
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
});
```

### 2. Update `dashboard-script.js`

Load real user data:
```javascript
async function loadUserData() {
    const token = localStorage.getItem('welfareToken');
    
    if (!token) {
        window.location.href = '/';
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/users/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        
        if (data.user) {
            document.getElementById('userName').textContent = data.user.full_name;
            document.getElementById('welfareScore').textContent = data.user.welfare_score + '%';
            document.getElementById('welfareStars').textContent = data.user.welfare_stars;
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}
```

### 3. Update `script.js` (Chatbot)

Connect to chat API:
```javascript
async function sendMessage(message) {
    const token = localStorage.getItem('welfareToken');
    
    try {
        const response = await fetch('http://localhost:3000/api/chat/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message,
                language: currentLanguage
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayBotMessage(data.response);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
```

---

## 🧪 TESTING

### Test the Complete Flow:

1. **Start Server:**
   ```bash
   npm start
   ```

2. **Open Browser:**
   ```
   http://localhost:3000
   ```

3. **Test Login:**
   - Enter mobile: `9876543210`
   - Click "Send OTP"
   - Check console for OTP (dev mode)
   - Enter OTP
   - Complete profile form
   - Submit

4. **Test Dashboard:**
   - View profile stats
   - Check matched schemes
   - View applications
   - Test quick chat

5. **Test API:**
   ```bash
   # Health check
   curl http://localhost:3000/api/health
   
   # Get schemes
   curl http://localhost:3000/api/schemes
   ```

---

## 🌍 DEPLOYMENT

### Production Deployment:

1. **Update Environment:**
   ```env
   NODE_ENV=production
   PORT=3000
   JWT_SECRET=<strong-random-secret>
   ```

2. **Build for Production:**
   ```bash
   npm install --production
   ```

3. **Deploy to:**
   - **Heroku:** `git push heroku main`
   - **AWS:** Use EC2 or Elastic Beanstalk
   - **DigitalOcean:** Use App Platform
   - **Vercel/Netlify:** For frontend + serverless functions

4. **Database:**
   - For production, consider PostgreSQL or MySQL
   - Or use managed SQLite with regular backups

---

## 📊 ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (HTML/CSS/JS)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Login   │  │Dashboard │  │  Chat    │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP/REST API
┌─────────────────────┴───────────────────────────────────┐
│              BACKEND (Node.js + Express)                │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Routes: Auth │ Users │ Schemes │ Apps │ Chat   │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Middleware: CORS │ Auth │ Rate Limit │ Helmet  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │ SQL Queries
┌─────────────────────┴───────────────────────────────────┐
│                DATABASE (SQLite)                        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │
│  │Users │ │Schemes│ │ Apps │ │Chat  │ │Progress│        │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST

- [x] Backend server created
- [x] Database schema designed
- [x] API routes implemented
- [x] Authentication with JWT
- [x] OTP verification
- [x] Scheme matching algorithm
- [x] Application tracking
- [x] AI chatbot responses
- [x] Progress tracking
- [x] Achievements system
- [x] Analytics endpoints
- [ ] Frontend-backend integration (next step)
- [ ] Testing
- [ ] Deployment

---

## 🎉 YOU NOW HAVE:

✅ **Complete Backend API** with 13+ endpoints
✅ **SQLite Database** with 7 tables
✅ **Authentication System** with OTP & JWT
✅ **AI Chatbot** with multilingual support
✅ **Scheme Matching** with intelligent scoring
✅ **Application Tracking** with status updates
✅ **Gamification** with stars & achievements
✅ **Analytics Dashboard** with platform stats

---

**Ready to run! Execute `npm install` then `npm run init-db` then `npm start`!** 🚀

# Campus Recruitment Portal - Backend Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Setup](#project-setup)
4. [Environment Variables](#environment-variables)
5. [Database Models](#database-models)
6. [Architecture & Workflow](#architecture--workflow)
7. [Authentication System](#authentication-system)
8. [API Endpoints](#api-endpoints)
9. [User Roles & Permissions](#user-roles--permissions)
10. [Folder Structure](#folder-structure)

---

## 🎯 Project Overview

**Campus Recruitment Portal** is a full-stack web application designed to facilitate recruitment activities on college campuses. It connects:
- **Students**: Browse job openings, apply for positions, track applications
- **Recruiters**: Post job openings, manage applications, shortlist candidates
- **Admins**: Oversee system, manage users, monitor recruitment activities

### Key Features
- **OTP-based Authentication**: Secure email verification for signup and login
- **Role-Based Access Control**: Students, Recruiters, and Admins have distinct permissions
- **Job Management**: Create, list, and manage job postings with eligibility criteria
- **Application System**: Dynamic form responses (Google Form style) for job applications
- **Email Notifications**: OTP and verification emails sent via Nodemailer
- **JWT Token Auth**: 7-day expiring tokens for authenticated requests

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend Framework** | Express.js v5.2.1 | REST API server & routing |
| **Database** | MongoDB (Mongoose 9.1.6) | NoSQL document storage |
| **Authentication** | JWT, bcryptjs | Secure token & password hashing |
| **Email Service** | Nodemailer 8.0.1 | OTP & verification emails |
| **OTP Generation** | otp-generator 4.0.1 | 6-digit OTP delivery |
| **Environment** | dotenv 17.2.4 | Configuration management |
| **CORS** | cors 2.8.6 | Frontend-backend communication |
| **Dev Tools** | nodemon 3.1.11 | Auto-restart on file changes |

---

## 📦 Project Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation Steps

```bash
# 1. Clone or navigate to project directory
cd Campus/Backend

# 2. Install all dependencies
npm install

# 3. Install development dependencies
npm install --save-dev nodemon

# 4. Create .env file in root directory (see Environment Variables section)

# 5. Start the server
npm start          # Production mode
nodemon server.js  # Development mode (auto-restart)

# Expected output:
# Server running on port 5000
# MongoDB Connected
```

### Dependencies Installed

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken nodemailer otp-generator
```

---

## 🔐 Environment Variables

Create a `.env` file in the Backend root directory with these variables:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key_here

# Port Configuration
PORT=5000

# Email Service (Gmail or any SMTP service)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Optional: API Base URL (for frontend)
API_BASE_URL=http://localhost:5000
```

**Important**: Never commit `.env` to version control. Add it to `.gitignore`.

---

## 💾 Database Models

### 1. **User Model** (`UserModel.js`)
Stores authentication and role information for all users.

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, required),
  password: String (bcrypt hashed, required),
  role: String (enum: "ADMIN", "STUDENT", "RECRUITER"),
  
  // OTP System Fields
  isVerified: Boolean (default: false),
  otp: String,
  otpExpiry: Date,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Relationships**: Referenced by StudentProfile, RecruiterProfile, Job, Application

---

### 2. **StudentProfile Model** (`StudentProfile.js`)
Extended profile information for student users.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  rollNumber: String,
  branch: String (required - e.g., "CSE", "ECE"),
  cgpa: Number (0-10 range),
  graduationYear: Number,
  skills: [String] (array of skill tags),
  resumeUrl: String (link to uploaded resume),
  verified: Boolean (default: false),
  
  createdAt: Date,
  updatedAt: Date
}
```

**Use Case**: Recruiters filter students by branch, CGPA, graduation year, and skills.

---

### 3. **Job Model** (`Job.js`)
Stores job postings created by recruiters or admins.

```javascript
{
  _id: ObjectId,
  title: String (required - e.g., "Software Engineer"),
  description: String (required - job details),
  recruiterId: ObjectId (ref: User, required),
  
  // Job Type & Location
  jobType: String (enum: "FULL_TIME", "INTERNSHIP", "PART_TIME", "CONTRACT"),
  workMode: String (enum: "ONSITE", "REMOTE", "HYBRID"),
  location: String,
  
  // Salary
  salary: {
    min: Number,
    max: Number,
    currency: String (default: "INR")
  },
  
  // Eligibility Criteria
  eligibility: {
    branches: [String],        // e.g., ["CSE", "ECE"]
    minCGPA: Number,          // e.g., 7.0
    graduationYears: [Number], // e.g., [2024, 2025]
    requiredSkills: [String]   // e.g., ["JavaScript", "React"]
  },
  
  // Application Settings
  customQuestions: [          // Dynamic form questions
    {
      label: String,
      type: String,           // "text", "email", "textarea", etc.
      required: Boolean
    }
  ],
  
  applicationDeadline: Date,
  status: String (enum: "OPEN", "CLOSED"),
  
  createdAt: Date,
  updatedAt: Date
}
```

**Use Case**: Students filter jobs by eligibility and apply through this.

---

### 4. **Application Model** (`Application.js`)
Tracks job applications with dynamic form responses.

```javascript
{
  _id: ObjectId,
  jobId: ObjectId (ref: Job, required),
  studentId: ObjectId (ref: User, required),
  
  // Dynamic Form Answers (Google Form style)
  answers: [
    {
      label: String,
      value: Mixed     // Can be string, number, boolean, etc.
    }
  ],
  
  status: String (enum: "APPLIED", "SHORTLISTED", "REJECTED", "SELECTED"),
  
  createdAt: Date,
  updatedAt: Date
}
```

**Use Case**: Recruiters review applications and change status from APPLIED → SHORTLISTED → SELECTED.

---

### 5. **RecruiterProfile Model** (`RecruiterProfile.js`)
Extended profile for recruiter users.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  companyName: String,
  companyWebsite: String,
  designation: String,
  verified: Boolean (default: false),
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🏗️ Architecture & Workflow

### High-Level System Flow

```
┌─────────────────┐
│   Frontend      │
│  (React/Vue)    │
└────────┬────────┘
         │ HTTP Requests
         ▼
┌─────────────────────────────────────────┐
│      Express Server (app.js)            │
├─────────────────────────────────────────┤
│  Routes → Controllers → Models (Logic)  │
│            ↓ (Query/Update)             │
│  Middleware (Auth, RoleCheck)           │
│            ↓ (Validation)               │
│  Utils (Email, Token, OTP)              │
└────────┬────────────────────────────────┘
         │
    ┌────┴─────┬──────────┬──────────┐
    ▼          ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│MongoDB │ │Nodemailer│ │JWT    │ │bcrypt  │
│Database│ │ (Email)  │ │(Token)│ │(Hash)  │
└────────┘ └────────┘ └────────┘ └────────┘
```

### Request Lifecycle

```
1. User Request (with/without JWT token)
         ↓
2. Express parses JSON body
         ↓
3. Route matches request → Controller function called
         ↓
4. Middleware (auth, roleCheck) validates request
         ↓
5. Controller logic executes (queries/updates database)
         ↓
6. Utils called if needed (send email, generate token)
         ↓
7. Response sent back to frontend (JSON)
```

---

## 🔓 Authentication System

### OTP-Based Authentication Flow

#### **Signup Process (3 Steps)**

```
Step 1: Register
━━━━━━━━━━━━━━━━
POST /api/auth/register
Body: { name, email, password, role }

→ Check if user exists
→ Hash password using bcryptjs
→ Generate 6-digit OTP (valid for 10 minutes)
→ Save user (isVerified=false, otp=generated_otp)
→ Send OTP email via Nodemailer
→ Response: "OTP sent to email"


Step 2: Verify OTP
━━━━━━━━━━━━━━━━━━
POST /api/auth/verify-otp
Body: { email, otp }

→ Find user by email
→ Check if OTP matches and not expired
→ Set isVerified=true, clear OTP
→ Generate JWT token (expires in 7 days)
→ Response: { token, message: "Account verified successfully" }


Step 3: Create Profile
━━━━━━━━━━━━━━━━━━━━━
POST /api/student or /api/recruiter (protected route)
Body: { profile details }

→ Extract userId from JWT
→ Create StudentProfile or RecruiterProfile
→ Link to User via userId
→ Response: Profile created
```

#### **Login Process (2 Steps)**

```
Step 1: Login with credentials
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST /api/auth/login
Body: { email, password }

→ Find user by email
→ Compare password with bcrypt stored hash
→ Generate OTP and send to email
→ Response: "OTP sent to email"


Step 2: Verify Login OTP
━━━━━━━━━━━━━━━━━━━━━━━━
POST /api/auth/verify-login-otp
Body: { email, otp }

→ Verify OTP validity (10 min window)
→ Generate JWT token (7 days expiry)
→ Response: { token, message: "Login successful" }
```

### Token Structure (JWT)

```javascript
// Payload encoded in token:
{
  id: "user_mongo_id",
  role: "STUDENT" | "RECRUITER" | "ADMIN",
  iat: 1707470000,                    // Issued at
  exp: 1708075200                     // Expires in 7 days
}

// Verification:
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;  // Available in protected routes
```

### Security Features

| Feature | Implementation |
|---------|-----------------|
| **Password Hashing** | bcryptjs with salt rounds = 10 |
| **OTP Generation** | 6-digit random numbers, 10-min expiry |
| **Token Security** | JWT signed with secret, 7-day expiry |
| **Email Verification** | OTP sent to registered email before activation |
| **HTTPS** | Use in production (configured on deployment) |

---

## 📡 API Endpoints

### **Authentication Routes** (`/api/auth`)

| Method | Endpoint | Auth | Body | Role | Response |
|--------|----------|------|------|------|----------|
| POST | `/register` | ❌ | `{ name, email, password, role }` | All | `{ message: "OTP sent" }` |
| POST | `/verify-otp` | ❌ | `{ email, otp }` | All | `{ token, message }` |
| POST | `/login` | ❌ | `{ email, password }` | All | `{ message: "OTP sent" }` |
| POST | `/verify-login-otp` | ❌ | `{ email, otp }` | All | `{ token, message }` |

**Example Request**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@college.edu",
    "password": "securePass123",
    "role": "STUDENT"
  }'
```

---

### **Student Routes** (`/api/student`)

| Method | Endpoint | Auth | Role | Body | Response |
|--------|----------|------|------|------|----------|
| GET | `/jobs` | ✅ | STUDENT | - | `[{ Job objects filtered by eligibility }]` |
| POST | `/apply/:jobId` | ✅ | STUDENT | `{ answers: [{ label, value }] }` | `{ applicationId, status: "APPLIED" }` |

**Example: Apply for Job**
```bash
curl -X POST http://localhost:5000/api/student/apply/job_id_123 \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [
      { "label": "Why do you want this job?", "value": "I love coding" },
      { "label": "Years of experience?", "value": "2" }
    ]
  }'
```

---

### **Recruiter Routes** (`/api/recruiter`)

| Method | Endpoint | Auth | Role | Body | Response |
|--------|----------|------|------|------|----------|
| POST | `/job` | ✅ | RECRUITER | `{ title, description, salary, eligibility, customQuestions }` | `{ jobId, message: "Job created" }` |

**Example: Create Job**
```bash
curl -X POST http://localhost:5000/api/recruiter/job \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Junior Developer",
    "description": "Build awesome web apps",
    "jobType": "FULL_TIME",
    "workMode": "REMOTE",
    "location": "Bangalore",
    "salary": {
      "min": 400000,
      "max": 800000,
      "currency": "INR"
    },
    "eligibility": {
      "branches": ["CSE", "IT"],
      "minCGPA": 7.0,
      "graduationYears": [2024, 2025],
      "requiredSkills": ["JavaScript", "React", "Node.js"]
    },
    "customQuestions": [
      {
        "label": "Why do you want to work with us?",
        "type": "textarea",
        "required": true
      }
    ]
  }'
```

---

### **Admin Routes** (`/api/admin`)

| Method | Endpoint | Auth | Role | Purpose |
|--------|----------|------|------|---------|
| POST | `/job` | ✅ | ADMIN | Create job (same as recruiter) |

---

## 👥 User Roles & Permissions

### **STUDENT Role**
- ✅ Can register and login
- ✅ Can view eligible job openings
- ✅ Can apply to jobs with custom form responses
- ✅ Can create/update student profile
- ✅ Can track application status
- ❌ Cannot create jobs
- ❌ Cannot see admin features

### **RECRUITER Role**
- ✅ Can register and login
- ✅ Can create job postings
- ✅ Can set eligibility criteria
- ✅ Can create custom form questions
- ✅ Can view applications received
- ✅ Can shortlist/reject/select candidates
- ❌ Cannot view other recruiters' jobs (unless admin approved)
- ❌ Cannot create jobs for other recruiters

### **ADMIN Role**
- ✅ Can create jobs (like recruiters)
- ✅ Can approve/manage recruiter accounts
- ✅ Can view system-wide analytics
- ✅ Can manage user roles
- ✅ Can moderate job postings
- ❌ Cannot apply for jobs

### **Authorization Middleware**

```javascript
// middleware/roleCheck.js
const roleCheck = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// Usage in routes:
router.post("/jobs", auth, roleCheck("RECRUITER"), jobController.createJob);
//                   ^^^^
//              Verify JWT token
//                                    ^^^^^^^^^^^
//                              Check if RECRUITER role
```

---

## 📁 Folder Structure

```
Backend/
│
├── controllers/              [Business Logic]
│   ├── authController.js        → Register, Login, OTP verification
│   ├── jobController.js         → Create, list, filter jobs
│   ├── studentController.js     → Student profile operations
│   ├── recruiterController.js   → Recruiter profile operations
│   └── applicationController.js → Apply job, manage applications
│
├── models/                   [Database Schemas]
│   ├── UserModel.js            → User authentication & roles
│   ├── StudentProfile.js       → Student extended info
│   ├── RecruiterProfile.js     → Recruiter extended info
│   ├── Job.js                  → Job postings schema
│   └── Application.js          → Job applications schema
│
├── routes/                   [API URLs & Methods]
│   ├── authRoutes.js           → /api/auth/* endpoints
│   ├── studentRoutes.js        → /api/student/* endpoints
│   ├── recruiterRoutes.js      → /api/recruiter/* endpoints
│   └── adminRoutes.js          → /api/admin/* endpoints
│
├── middleware/               [Request Intercept & Validation]
│   ├── auth.js                 → JWT token verification
│   ├── roleCheck.js            → Role-based access control
│   └── errorHandler.js         → Centralized error handling
│
├── utils/                    [Helper Functions]
│   ├── generateToken.js        → Create JWT tokens
│   ├── generateOtp.js          → Generate 6-digit OTP
│   ├── sendEmail.js            → Send emails via Nodemailer
│   └── otpEmailTemplate.js     → HTML email template
│
├── config/                   [Configuration]
│   └── db.js                   → MongoDB connection setup
│
├── app.js                    [Express App Setup]
│   ├── Imports all routes
│   ├── Sets up middleware (CORS, JSON parser)
│   ├── Links routes to API paths
│   └── Error handling middleware
│
├── server.js                 [Entry Point]
│   ├── Loads environment variables (.env)
│   ├── Connects to MongoDB
│   ├── Starts Express server on PORT
│   └── Logs connection status
│
├── package.json              [Dependencies & Scripts]
└── .env                      [Environment Variables] ⚠️ DO NOT COMMIT

```

### **Folder Responsibilities Summary**

| Folder | Decides | Example |
|--------|---------|---------|
| **Routes** | What URL paths exist | `/api/student/apply` |
| **Controllers** | What happens on that URL | "Find job, create application, save to DB" |
| **Models** | How data is structured in DB | "Student has CGPA, rollNumber, skills" |
| **Middleware** | Who/when a request is allowed | "Only logged-in users, only STUDENTS can apply" |
| **Utils** | Reusable helper functions | "Generate token, send email, hash password" |
| **Config** | System setup | "Connect to MongoDB, set connection options" |

---

## 🔄 Complete Request Flow Example

**Scenario**: A student applies for a job

```
1️⃣ FRONTEND SENDS REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST /api/student/apply/job_123
Headers: { Authorization: "Bearer JWT_TOKEN", Content-Type: "application/json" }
Body: { answers: [{ label: "Experience?", value: "2 years" }] }


2️⃣ EXPRESS RECEIVES ROUTE
━━━━━━━━━━━━━━━━━━━━━━━━━
app.use('/api/student', studentRoutes);
  └─> Matches route POST /apply/:jobId
  └─> Calls middleware and controller


3️⃣ MIDDLEWARE LAYER - auth.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const token = req.headers.authorization.split(" ")[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = { id: "user_id_456", role: "STUDENT" };
next();


4️⃣ MIDDLEWARE LAYER - roleCheck.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
if (!["STUDENT"].includes(req.user.role)) {
  return res.status(403).json({ message: "Access denied" });
}
next();  // ✅ User is STUDENT, proceed


5️⃣ CONTROLLER - applicationController.applyJob()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const jobId = req.params.jobId;
const studentId = req.user.id;
const { answers } = req.body;

// Query Job & Student DB to verify eligibility
const job = await Job.findById(jobId);
const student = await StudentProfile.findOne({ userId: studentId });

// Check CGPA, branch, graduation year eligibility
if (student.cgpa < job.eligibility.minCGPA) {
   return res.status(400).json({ message: "CGPA doesn't meet requirement" });
}

// Create Application in DB
const application = await Application.create({
   jobId,
   studentId,
   answers,
   status: "APPLIED"
});

Response: {
   message: "Application submitted",
   applicationId: application._id,
   status: "APPLIED"
}


6️⃣ FRONTEND RECEIVES RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Show success message to student
   "Your application has been submitted! Status: APPLIED"
   Navigate to /dashboard or /applications
```

---

## 🚀 Running the Server

### Development Mode (with auto-restart)
```bash
cd Backend
npm start
# or use nodemon:
npx nodemon server.js
```

### Production Mode
```bash
npm install -g pm2  # Process Manager
pm2 start server.js --name "campus-backend"
pm2 status
```

### Test Endpoints (using Postman, curl, or REST Client)
```bash
# 1. Register a new student
POST http://localhost:5000/api/auth/register

# 2. Verify OTP
POST http://localhost:5000/api/auth/verify-otp

# 3. Get available jobs (requires JWT token)
GET http://localhost:5000/api/student/jobs
Headers: { Authorization: "Bearer YOUR_JWT_TOKEN" }

# 4. Apply for job
POST http://localhost:5000/api/student/apply/JOB_ID
```

---

## 📝 Notes & Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use HTTPS in production** - JWT tokens should only travel over SSL
3. **Validate all inputs** - Check email format, password strength
4. **Rate limiting** - Implement to prevent brute force attacks
5. **CORS configuration** - Whitelist only your frontend domain
6. **Error logging** - Implement logging for debugging production issues
7. **Database indexing** - Create indexes on frequently queried fields (email, role)

---

## ✅ Checklist for First-Time Setup

- [ ] Clone/download the project
- [ ] Run `npm install`
- [ ] Create `.env` file with MongoDB URI and JWT secret
- [ ] Verify MongoDB connection works
- [ ] Configure Nodemailer with email credentials
- [ ] Run `npm start` or `nodemon server.js`
- [ ] Test endpoint: `GET http://localhost:5000/` (should return "API is running...")
- [ ] Test auth: POST to `/api/auth/register` with sample data
- [ ] Check MongoDB to verify user was created
- [ ] Verify OTP email was sent
- [ ] Test token generation after OTP verification

---

**Created**: Campus Recruitment Portal v1.0
**Last Updated**: February 2026


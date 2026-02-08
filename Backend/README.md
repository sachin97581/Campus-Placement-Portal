## Prject set-up command 
1. npm init 
2. npm install express mongoose dotenv cors
    express → server & routing
    mongoose → MongoDB ORM
    dotenv → environment variables
    cors → frontend-backend communication
3. Install Dev Dependencies (Important)
    npm install --save-dev nodemon

## Prject Folder Structure 
    backend/
 ├── controllers/
 │    ├── authController.js
 │    ├── studentController.js
 │    ├── recruiterController.js
 │    ├── jobController.js
 │    └── applicationController.js
 │
 ├── models/
 │    ├── User.js
 │    ├── StudentProfile.js
 │    ├── RecruiterProfile.js
 │    ├── Job.js
 │    └── Application.js
 │
 ├── routes/
 │    ├── authRoutes.js
 │    ├── studentRoutes.js
 │    ├── recruiterRoutes.js
 │    └── adminRoutes.js
 │
 ├── middleware/
 │    ├── auth.js
 │    ├── roleCheck.js
 │    └── errorHandler.js
 │
 ├── utils/
 │    ├── sendEmail.js
 │    └── generateToken.js
 │
 ├── config/
 │    └── db.js
 │
 ├── app.js
 └── server.js

 ## Some information about Folders Structure 

    Routes decide URL,
    Controllers decide what happens,
    Models decide how data looks,
    Middleware decides who/when,
    Utils are helpers,
    Config is setup.


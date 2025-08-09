# Basti Ki Pathshala Foundation

## 📌 Project Information

This is a full-stack application for the Basti Ki Pathshala Foundation.

### **Frontend**
- React
- Vite
- Tailwind CSS & DaisyUI
- React Router DOM
- React Hook Form with Zod

### **Backend**
- Node.js & Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) for authentication
- Security middlewares:
  - Helmet
  - CORS
  - express-rate-limit
  - xss-clean

---

## 🚀 How to Run Locally

### **Prerequisites**
- Node.js and npm installed
- MongoDB installed and running, or a MongoDB Atlas connection string

## 🔹 Backend Setup

1. Navigate to the backend directory:
     cd backend

2. Install Dependencies:
     npm install

3. Create a .env file in the backend and add:
     - MONGO_URI=your_mongodb_connection_string
     - JWT_SECRET=your_secret_key
     - ADMIN_EMAIL=admin@example.com
     - ADMIN_PASSWORD=your_secure_password
     - CLIENT_URL=http://localhost:5173
   
4. Start the backend server:
    npm run dev

## The server will run on port 5000 by default.

## 🔹 Frontend Setup
1. Navigate to the frontend directory:
    cd frontend

2. Install dependencies:
    npm install

3. Create a .env file in the frontend directory and add:
    VITE_API_URL=http://localhost:5000/api

4.Start the frontend development server:
    npm run dev

## The application will be accessible at http://localhost:5173

     
   ```bash
   cd backend

# 📝 BlogVista - A Dynamic Blogging Platform

Welcome to **BlogVerse**, a modern and responsive blogging website where users can create, explore, and manage blogs with ease. This is a full-stack blog application built using **React**, **Firebase**, **MongoDB**, and **Express.js**, designed with recruiter-friendly UI/UX and enriched with animations and theme toggle support.

## 🌐 Live Site
[🔗 Live Website Link](https://job-tracker-f9fa2.web.app/)

---

## 🚀 Project Purpose

The goal of this project is to build a fully functional blog platform featuring modern authentication, blog management, wishlist functionality, featured blog sorting, dynamic UI components, protected routes, and responsiveness across all devices — tailored for real-world deployment scenarios.

---

## ✅ Key Features

### 👤 Authentication
- Email & password login
- Google login (OAuth)
- Form validation and error feedback
- JWT-based protected routes

### 🌟 Frontend Features
- React + Tailwind CSS
- Theme toggle (Light/Dark mode)
- Responsive design (Mobile, Tablet, Desktop)
- Framer Motion animations
- React Loading Skeletons
- Blog image fullscreen preview using `react-photo-view`
- Intersection-based animations using `react-intersection-observer`

### 🏠 Home Page
- Hero banner with call-to-action
- Recent Blogs (limit 6)
- Wishlist integration
- Newsletter toast message
- Extra creative sections (e.g., Writing Tips, Tech Insights)

### 📚 Blog Management
- Add Blog (with form, dropdown category)
- Update Blog (pre-filled form on private route)
- Blog Details with:
  - Full content
  - Comment system (except own blog)
  - Conditional update button
- All Blogs with:
  - Search by title (MongoDB text search)
  - Filter by category

### 📌 Wishlist
- Add/remove blogs to/from wishlist
- Server-side filtering based on current user
- Table view with details and delete functionality

### 🔥 Featured Blogs
- Top 10 blogs based on long description word count
- Data table using **TanStack Table**
- Sortable columns for better UX

---

## 🧩 Technologies & Libraries Used

### 🖥️ Frontend (Client)
- **React**
- **Tailwind CSS**
- **Firebase Auth**
- **React Router**
- **Framer Motion**
- **React Loading Skeleton**
- **TanStack Table**
- **React Photo View**
- **React Intersection Observer**
- **Context API (for theme toggle)**

### 🌐 Backend (Server)
- **Node.js**
- **Express.js**
- **MongoDB (native driver)**
- **CORS**
- **JWT**
- **dotenv**

---

## 🔐 Environment Variables

### 🔑 Client-side `.env`
```bash
VITE_API_URL=https://blog-server-mu-navy.vercel.app/
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```


### 🔐 Server-side `.env`
```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Installation & Usage

### 🛠 Client
```bash
cd blogverse-client
npm install
npm run dev
⚙ Server
cd blogverse-server
npm install
npm run start
```
📝 Deployment Notes
Frontend: Deployed on Firebase

Backend: Deployed on Vercel / Render

Firebase authorized domain configured

Reloading on any route works smoothly (no 404/CORS issues)

JWT protected routes retain user session even on reload

📊 Folder Structure Overview
Client
```bash
src/
├── components/
├── context/
├── pages/
├── routes/
├── hooks/
├── utils/
├── layout/
├── assets/
└── App.jsx
```
Server
```bash
server/
├── routes/
├── controllers/
├── models/
├── middleware/
├── config/
└── index.js
```
🔧 Optional Features Implemented
✅ Theme toggle (Light/Dark mode)

✅ Blog image full-screen view

✅ Scroll-triggered animations

✅ Loading skeletons

✅ Data table with sorting (TanStack Table)



🤝 Acknowledgments
Thanks to the assignment reviewers and the open-source community behind React, Firebase, and all supporting libraries. Special appreciation to those building UI/UX inspiration sites.

📬 Contact
Created by Sonia Akter Hira
📧 Email:soniahira48@gmail.com
# BlogVista - Frontend

## 🚀 Project Overview

**BlogVista** is a dynamic and responsive blog website built with React. It allows users to register, post blogs, manage wishlists, and engage with other users via commenting. The frontend is designed to be mobile-friendly, visually appealing, and interactive.

Live Site: [https://job-tracker-f9fa2.web.app/]

---

## 📌 Key Features

- 🔐 Email/Password + Google Auth (Firebase)
- 📝 Add, View, Filter, and Update Blogs
- ❤️ Wishlist functionality (user-specific)
- 💬 Commenting system (except on own blogs)
- 📊 Featured Blogs using **TanStack Table** with sorting
- 🔒 JWT-based private route protection
- 📧 Newsletter subscription with toast feedback
- 📱 Fully responsive (Mobile, Tablet, Desktop)
- 🎨 Dark mode-ready (Tailwind + DaisyUI)
- ✨ Framer Motion animations on homepage
- 📷 Fullscreen blog image preview (via `react-photo-view`)
- 🧠 Tips and extra sections for unique UX

---

## 📁 Project Structure

src/
├── components/ // Shared UI components (Navbar, Footer, etc.)
├── pages/ // All route-based pages
├── hooks/ // Custom hooks
├── routes/ // Route configs and private route guards
├── contexts/ // Auth and Theme context providers
└── api/ // Axios instance and API calls

markdown
Copy
Edit

---

## 🧩 Technologies Used

- **React**
- **React Router DOM**
- **Firebase Auth**
- **TanStack Table**
- **DaisyUI** + **TailwindCSS**
- **Framer Motion**
- **React Toastify**
- **React Loading Skeleton**
- **React Photo View**
- **React Intersection Observer**
- **Axios**

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

VITE_API_BASE_URL=https://your-api.vercel.app
VITE_FIREBASE_API_KEY=xxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxxxxx
VITE_FIREBASE_PROJECT_ID=xxxxxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxx
VITE_FIREBASE_APP_ID=xxxxxxxx

yaml
Copy
Edit

---

## 🛠 Deployment

Deployed using **firebase**.

---

## 📚 NPM Packages Used

"axios"
"firebase"
"react"
"react-dom"
"react-router-dom"
"react-photo-view"
"react-intersection-observer"
"react-loading-skeleton"
"react-toastify"
"@tanstack/react-table"
"framer-motion"
"daisyui"
"tailwindcss"

yaml
Copy
Edit

---



## 💬 Feedback

Pull requests are welcome! For feedback, contact [soniahira48@gmail.com].
# BlogVista - Backend

## ⚙️ Project Overview

The **BlogVista Backend** is a RESTful API built using Express.js and MongoDB. It provides endpoints for blog management, comments, wishlist, user verification, and secure authentication using **Firebase Admin SDK** and **JWT tokens**.

Backend Live API: [https://blog-server-mu-navy.vercel.app/]

---

## 🔑 Key Features

- 🌐 RESTful API with Express.js
- 🔐 Firebase Admin for user verification
- 🔒 JWT Authentication for protected routes
- 📝 Blog Create, Read, Update, Delete (CRUD)
- 💬 Comment system (user-linked)
- ❤️ Wishlist system (user-specific)
- 📚 Blog filtering and search with MongoDB text search
- 📊 Blog feature ranking by description length
- 🚀 Hosted on Vercel

---

## 🛠 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Firebase Admin SDK**
- **jsonwebtoken**
- **cors**
- **dotenv**

---

## 🌍 API Endpoints Overview

### Authentication
- `POST /jwt`: Generate JWT for logged-in user
- `POST /verify-token`: Verify Firebase token and assign role

### Blogs
- `GET /blogs`: Get all blogs (search & filter supported)
- `GET /blogs/:id`: Get blog by ID
- `POST /blogs`: Add new blog (protected)
- `PATCH /blogs/:id`: Update blog (protected)
- `DELETE /blogs/:id`: Delete blog (protected)

### Comments
- `POST /comments`: Add a comment (non-owner only)
- `GET /comments/:blogId`: Get comments for blog

### Wishlist
- `GET /wishlist/:email`: Get wishlisted blogs (user-based)
- `POST /wishlist`: Add to wishlist
- `DELETE /wishlist/:id`: Remove from wishlist

---

## 🧾 MongoDB Collections

- `blogs`
- `comments`
- `wishlists`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blogvista
JWT_SECRET=your_jwt_secret
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxx\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com

yaml
Copy
Edit

---

## 🚀 Deployment

Deployed using **Vercel Serverless Functions**. Make sure to allow CORS and handle dynamic route reloads.

---

## 📚 NPM Packages Used

"express"
"cors"
"dotenv"
"firebase-admin"
"jsonwebtoken"
"mongodb"

yaml
Copy
Edit

---

## 🔐 Security Notes

- All sensitive data is secured using environment variables.
- All private routes are protected via middleware using **JWT tokens**.
- Firebase Admin is used to verify users and enhance security.

---

## 🤝 Contributing

Pull requests are welcome! For feedback or bug reports, email [your-email@example.com].

---

## 📸 API Testing

Use [Postman](https://postman.com) or [Thunder Client](https://www.thunderclient.com/) to test all routes locally or in production.

---
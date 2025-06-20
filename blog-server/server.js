const express = require('express');
const cors = require('cors');
const { connectToDB, getDB } = require('./config/db');
const wishlistRoutes = require('./routes/wishlistRoutes');
const commentRoutes = require('./routes/commentRoutes');
const app = express();
const port = 3000;

// CORS Configuration
app.use(cors());

app.use(express.json());

connectToDB().then(() => {
  const db = getDB();
  app.locals.db = db;

  // Routes
  const userRoutes = require('./routes/userRoutes')(db); // if applicable
  const blogRoutes = require('./routes/blogRoutes');

  app.use('/api', userRoutes);           // e.g., POST /api/users
  app.use('/api/blogs', blogRoutes); 
  
app.use('/api/wishlist', wishlistRoutes);    // e.g., GET /api/blogs or POST /api/blogs

app.use('/api/comments', commentRoutes);
  app.get('/', (req, res) => {
    res.send("Server is running smoothly");
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect to DB:", err);
});
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

let db;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db('my-blog');
    console.log("Connected to MongoDB Atlas");
    await db.collection('blogs').createIndex(
      {
        title: 'text',
        shortDescription: 'text',
        longDescription: 'text'
      },
      {
        name: 'BlogsTextIndex' // optional: give it a custom name
      }
    );
    console.log('Text index created (or already exists) on blogs collection');

  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error("DB not initialized. Call connectToDB() first.");
  }
  return db;
}

module.exports = { connectToDB, getDB };

import express from "express";
import cors from "cors";
import path from "path";
import 'dotenv/config';
import router from "./Router.js";
import connectDB from "./database/connection.js";
import favicon from 'serve-favicon';

const app = express();

const corsOptions = {
  origin: 'https://sealand.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Serve favicon
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// Connect to the database
async function initialize() {
  await connectDB();
}

// Health check route
app.get("/", async (req, res) => {
  try {
    await initialize(); // Ensure DB is connected
    console.log("Received request at / route");
    res.status(200).json("Hello, working fine");
  } catch (error) {
    console.error("Error initializing app:", error);
    res.status(500).json({ error: "Initialization error" });
  }
});

// API routes
app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

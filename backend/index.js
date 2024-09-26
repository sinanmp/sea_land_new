import express from "express";
import cors from "cors";
import 'dotenv/config';
import router from "./Router.js";
import connectDB from "./database/connection.js";
import ServerlessHttp from "serverless-http";

const app = express();

const corsOptions = {
  origin: 'https://sealand.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Connect to the database once when the application starts
// async function initialize() {
//   try {
//     await connectDB();
//     console.log("Database connected successfully!");
//   } catch (error) {
//     console.error("Database connection error:", error);
//   }
// }

// Initialize the database connection at startup
// initialize().catch(err => {
//   console.error("Initialization error:", err);
// });

// Health check route
app.get("/", async (req, res) => {
  console.log("Received request at / route");
  res.status(200).json("Hello, working fine");
});

// API routes
app.use('/api', router);

// Export the handler for Vercel
export default ServerlessHttp(app);

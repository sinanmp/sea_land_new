import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  mongoose.set("strictQuery", false);
  
  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("Database connected successfully!");
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    throw new Error("Failed to connect to database");
  }
}

export default connectDB;

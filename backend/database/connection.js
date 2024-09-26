import mongoose from "mongoose";

let isConnected = false; // Track connection status

function connectDB() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      isConnected = true; // Set connection status
      console.log("Database connected successfully!");
    })
    .catch((error) => {
      console.log(`Database connection error: ${error}`);
    });
}

export default connectDB;

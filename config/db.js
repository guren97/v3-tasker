import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URL = process.env.DATABASE_URL;
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to database`);
  } catch (error) {
    console.log(`Cannot connect to database`);
  }
};

export default connectDB;

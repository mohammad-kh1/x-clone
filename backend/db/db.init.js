import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`db connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

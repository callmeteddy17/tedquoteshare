import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('MongoDB is already connected');
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('Mongo Connected');
  } catch (error) {
    console.log(error);
  }
};

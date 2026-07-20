import mongoose from 'mongoose';

/**
 * Connect to MongoDB Database
 * @returns {Promise} MongoDB connection promise
 */
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected Successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;

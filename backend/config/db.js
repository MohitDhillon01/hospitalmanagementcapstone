import mongoose from 'mongoose';

/**
 * Connect to MongoDB Database
 * @returns {Promise} MongoDB connection promise
 */
const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://fullstackDatabase:Mohit1234@ac-xavyown-shard-00-00.pe8nona.mongodb.net:27017,ac-xavyown-shard-00-01.pe8nona.mongodb.net:27017,ac-xavyown-shard-00-02.pe8nona.mongodb.net:27017/?ssl=true&replicaSet=atlas-ug434c-shard-0&authSource=admin&appName=Mohit01');

    console.log('MongoDB Connected Successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
mmmc
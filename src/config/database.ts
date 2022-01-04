import mongoose from 'mongoose';
import logger from './logger';

const db = async () => {
  const dbUri = process.env.MONGO_URI;
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.info('connection error', error);
    process.exit(1);
  }
};

export default db;

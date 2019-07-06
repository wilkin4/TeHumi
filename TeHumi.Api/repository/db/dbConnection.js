import mongoose from 'mongoose';
import { DB_URL } from '../../configurations';

const dbConnect = () => {
  mongoose.connect(DB_URL, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on('error', () => {
    console.log('Database connection error.');
  });

  db.once('open', () => {
    console.log('Database connection successfully.');
  });
}

export default dbConnect;
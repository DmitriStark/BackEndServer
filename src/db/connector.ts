import { connect as mongooseConnect, connection, Mongoose } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const protocol = 'mongodb+srv';

const database = {
  connect: async (): Promise<Mongoose> => {
    return mongooseConnect(`${protocol}://${process.env.ATLAS_HOST}`, {
      user: process.env.ATLAS_USER,
      pass: process.env.ATLAS_PASS,
      dbName: 'test',
    });
  },
  disconnect: async (): Promise<void> => {
    return connection.close();
  },
};

export default database;

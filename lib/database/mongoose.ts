'use server'

import mongoose, {Mongoose} from 'mongoose';

const MONGODB_URL: string = process.env.MONGODB_URL!;
console.log('MongoDB connection url: ', MONGODB_URL);

interface MongooseConnection {
  connection: Mongoose|null;
  promise: Promise<Mongoose>|null;
}

let cache: MongooseConnection = (global as any).mongoose || {connection: null, promise: null}

const connectToDB = async() => {
  if(cache.connection) return cache.connection;
  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');
  if(!cache.promise){
    cache.promise = mongoose.connect(MONGODB_URL, {dbName: 'giftGenerator', bufferCommands: false})
  }
  cache.connection = await cache.promise
  cache.connection && console.log("connect to DB successfully")
  return cache.connection
}

export default connectToDB








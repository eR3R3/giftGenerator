'use server'

import mongoose, {Mongoose} from 'mongoose';

const mongodb_url: string = process.env.MONGODB_URL!

interface mongooseConnection {
  promise: Promise<Mongoose> | null,
  connection: Mongoose | null
}

let cache: mongooseConnection = (global as any).mongoose || {promise: null, connection: null}

export default async function connectToDB() {
  if(cache.connection) return cache.connection
  if(!mongodb_url) throw new Error('MongoDB URL is missing')
  if(!cache.promise){
    cache.promise = mongoose.connect(mongodb_url, {dbName: 'giftGenerator', bufferCommands: false})
  }
  cache.connection = await cache.promise
  console.log("connect to MongoDB successfully")
  return cache.connection
}












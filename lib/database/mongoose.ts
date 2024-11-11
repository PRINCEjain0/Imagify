import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

interface cachedType {

    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;

}


let cached: cachedType = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

const connectToDatabase = async () => {

    if (cached.conn) return cached.conn


    if (!MONGODB_URL) throw new Error("Missing MONGODB_URL")

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'imagify', bufferCommands: false
    })

    cached.conn = await cached.promise


}

export default connectToDatabase
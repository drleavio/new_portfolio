import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const MONGO_URI = "mongodb+srv://user:don0nf3e8qAMW0g8@cluster0.k9sm2do.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Connect MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // already connected

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "portfolio",
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

export async function GET(req:NextRequest){
    
        try {
            connectDB();
            const collection = mongoose.connection.collection("messages");
            const response=await collection.find().toArray();
            return NextResponse.json({response},{status:200});
        } catch (error) {
            return NextResponse.json({message:"error fetching data"},{status:404})
        }
}
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// 🔐 MongoDB URI
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

// ✅ POST handler
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email,subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Insert into MongoDB collection
    const collection = mongoose.connection.collection("messages");
    const result = await collection.insertOne({ name, email,subject, message, createdAt: new Date() });

    return NextResponse.json(
      { message: "Message received", insertedId: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in POST /api/message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

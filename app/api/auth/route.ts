import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const myPassword = "1998"; // store as string for comparison
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ message: "Password is required" }, { status: 400 });
    }

    const isAuthenticated = password === myPassword;
    return NextResponse.json({ message: isAuthenticated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 500 });
  }
}

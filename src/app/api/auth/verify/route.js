import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

export async function GET(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json(
      { message: "Token is valid", user: decoded },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
} 
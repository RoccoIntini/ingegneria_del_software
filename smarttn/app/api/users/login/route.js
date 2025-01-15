import User from "@/libs/models/user";
import connectMongoDB from "@/libs/mongodb";
import bcrypt from "bcrypt";
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

const SECRET_KEY = "Abgdkgdh";

export async function POST(request) {
    
        const { username, password } = await request.json();
        await connectMongoDB();

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: "Utente non trovato" }, { status: 404 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Password errata" }, { status: 401 });
        }

        const payload={ userid: user._id, username: user.username, role: user.role};

        console.log("Abgdkgdh");
        const token = jwt.sign(payload, "Abgdkgdh", {expiresIn: "1h"});

        const response = NextResponse.json({ message: "Accesso effettuato", token, userId: user._id, role: user.role }, { status: 200 });
        response.cookies.set('tokenjwt', token, {
            httpOnly:true,
            maxAge: "1h",
            path: '/',
        });
        return response;
    
}

export async function GET(request) {
    const cookies = request.headers.get("cookie"); 
    if (!cookies) {
      return NextResponse.json({ message: "Nessun cookie trovato" }, { status: 401 });
    }
  
    const parsedCookies = parse(cookies); 
    const token = parsedCookies.tokenjwt; 
    if (!token) {
      return NextResponse.json({ message: "Token non trovato" }, { status: 401 });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY); 
      return NextResponse.json({ message: "Token valido", decoded });
    } catch (error) {
      return NextResponse.json({ message: "Token non valido", error: error.message }, { status: 401 });
    }
  }
  

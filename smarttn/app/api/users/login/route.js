import User from "@/libs/models/user";
import connectMongoDB from "@/libs/mongodb";
import bcrypt from "bcrypt";
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

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

    console.log("SCIPOLLA");
    const token = jwt.sign(payload, "SCIPOLLA", {expiresIn: "1h"});

    const response = NextResponse.json({ message: "Accesso effettuato", token, userId: user._id, role: user.role }, { status: 200 });
    response.cookies.set('tokenjwt', token, {
        httpOnly:true,
        maxAge: "1h",
        path: '/',
    });
    return response;
}

export default function handler(req, res) {
    const cookies = req.headers.cookie; // Ottieni i cookie dalla richiesta
    if (!cookies) {
      res.status(401).json({ message: 'Nessun cookie trovato' });
      return;
    }
  
    const parsedCookies = parse(cookies); // Analizza i cookie
    const token = parsedCookies.tokenjwt; // Leggi il cookie specifico
    console.log("Token lato server:", token);
  
    if (!token) {
      res.status(401).json({ message: 'Token non trovato' });
      return;
    }
  
    res.status(200).json({ message: 'Token trovato', token });
  }
  

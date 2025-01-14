import User from "@/libs/models/user";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {username, password, role} = await  request.json();
    await connectMongoDB();
    await User.create({username, password, role});
    return NextResponse.json({message: "Utente creato"}, {status: 201});
}

export async function GET(request) {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({users});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({message: "Utente eliminato"}, {status: 200});
}

import Richiesta from "@/libs/models/request";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();
    const richiesta = await Richiesta.find();
    return NextResponse.json({richiesta});
}

export async function POST(request) {
    const {title, topic, description} = await  request.json();
    await connectMongoDB();
    await Richiesta.create({title, topic, description});
    return NextResponse.json({message: "Richiesta creata"}, {status: 201});
}
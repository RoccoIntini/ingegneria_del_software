import Course from "@/libs/models/course";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {title, description, author, topic, contentBlocks} = await  request.json();
    await connectMongoDB();
    await Course.create({title, description, author, topic, contentBlocks});
    return NextResponse.json({message: "Corso creato"}, {status: 201});
}

export async function GET(request) {
    await connectMongoDB();
    const courses = await Course.find();
    return NextResponse.json({courses});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Course.findByIdAndDelete(id);
    return NextResponse.json({message: "corso eliminato"}, {status: 200});
}
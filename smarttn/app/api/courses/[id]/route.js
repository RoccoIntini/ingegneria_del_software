import Course from "@/libs/models/course";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
    const { id } = params;
    const { newTitle: title,
        newDescription: description,
        newAuthor: author,
        newCategory: category,
        newContentBlocks: contentBlocks } = await request.json();
    await connectMongoDB();
    await Course.findByIdAndUpdate(id, { title, description, author, category, contentBlocks });
    return NextResponse.json({ message: "Corso modificato" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const course = await Course.findOne({ _id: id });
    return NextResponse.json(course, { status: 200 });
}
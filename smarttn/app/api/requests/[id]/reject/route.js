import Richiesta from "@/libs/models/request";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const { id } = params;
    await connectMongoDB();

    const richiesta = await Richiesta.findByIdAndDelete(id);
    if (!richiesta) {
        return NextResponse.json({ message: "Richiesta non trovata" }, { status: 404 });
    }

    return NextResponse.json(null, { status: 204 });
}
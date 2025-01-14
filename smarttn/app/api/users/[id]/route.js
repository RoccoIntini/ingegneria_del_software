import User from "@/libs/models/user";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request, {params}){
    const {id} = params;
    const  {newUsername: username, newPassword: password, newRole: role} = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, {username, password, role});
    return NextResponse.json({message: "Utente modificato"}, {status: 200});
}

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    const user = await User.findOne({_id: id});
    return NextResponse.json(user, {status: 200});
}
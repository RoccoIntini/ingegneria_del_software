import User from "@/libs/models/user";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(request, { params }) {
    const { id } = params;
    const { newUsername: username, newPassword: password, newRole: role } = await request.json();

    await connectMongoDB();

    // Prepara l'oggetto di aggiornamento
    const updateFields = {};
    if (username) updateFields.username = username;
    if (role) updateFields.role = role;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        updateFields.password = await bcrypt.hash(password, salt);
    }

    try {
        const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
        if (!user) {
            return NextResponse.json({ message: "Utente non trovato" }, { status: 404 });
        }
        return NextResponse.json({ message: "Utente modificato" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Errore durante l'aggiornamento dell'utente" }, { status: 500 });
    }
}

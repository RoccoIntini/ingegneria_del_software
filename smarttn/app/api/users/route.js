import User from "@/libs/models/user";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Joi from "joi";

// Schema di validazione per l'input utente
const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("user", "poweruser", "admin").optional(),
    courseHistory: Joi.array().items(Joi.string()).optional(),
});

// Metodo POST: Creazione di un nuovo utente
export async function POST(request) {
    try {
        const body = await request.json();

        // Validazione dell'input
        const { error } = userSchema.validate(body);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        const { username, password, role, courseHistory } = body;

        // Connessione al database
        await connectMongoDB();

        // Creazione dell'utente
        const newUser = await User.create({ username, password, role, courseHistory });

        return NextResponse.json({ message: "Utente creato con successo", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Errore nella creazione dell'utente:", error);
        return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
    }
}

// Metodo GET: Recupero degli utenti
export async function GET() {
    try {
        // Connessione al database
        await connectMongoDB();

        // Recupero di tutti gli utenti (escludendo il campo password)
        const users = await User.find({}, { password: 0 });

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Errore nel recupero degli utenti:", error);
        return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
    }
}

// Metodo DELETE: Eliminazione di un utente
export async function DELETE(request) {
    try {
        // Recupero dell'ID dalla query string
        const id = request.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID utente non fornito" }, { status: 400 });
        }

        // Connessione al database
        await connectMongoDB();

        // Eliminazione dell'utente
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
        }

        return NextResponse.json({ message: "Utente eliminato con successo" }, { status: 200 });
    } catch (error) {
        console.error("Errore nella cancellazione dell'utente:", error);
        return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
    }
}

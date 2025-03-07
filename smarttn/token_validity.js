'use server';
import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers';

export async function checkTokenValidity() {
    // Ottieni il token dai cookie
    const token = await cookies().get('tokenjwt')?.value;

    // Se il token non è presente o non è una stringa valida
    if (!token || typeof token !== 'string') {
        console.error('Token non valido o non presente');
        console.log("false");
        
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        // Verifica se il token è scaduto
        if (decoded.exp < currentTime) {
            console.error('Token scaduto');
            return false;
        }


        // Se tutto è valido, ritorna il token decodificato
        console.log("true");
        console.error('Token presente');

        return true;

    } catch (error) {
        console.error('Errore nella decodifica del token:', error);
        return false;
    }
}

import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers'; // Import necessario per accedere ai cookie
import { NextResponse } from 'next/server';

export function middleware(request) {
    // Ottieni i cookie dalla richiesta
    const token = cookies().get('tokenjwt')?.value;

    if (!token || typeof token !== 'string') {
        console.error('Token non valido o non presente');
        return NextResponse.redirect('https://ingegneria-del-software-phcc.onrender.com/login');
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
            console.error('Token scaduto');
            return NextResponse.redirect('https://ingegneria-del-software-phcc.onrender.com/login');
        }

        if (decoded.role === 'user') {
            console.error('Area riservata ad admin e poweruser');
            return NextResponse.redirect('https://ingegneria-del-software-phcc.onrender.com/login');
        }
    } catch (error) {
        console.error('Errore nella decodifica del token:', error);
        return NextResponse.redirect('https://ingegneria-del-software-phcc.onrender.com/login');
    }

    return NextResponse.next(); // Procedi normalmente
}

export const config = {
    matcher: ['/admin/:path*'], // Applica il middleware solo ai percorsi specificati
};

"use client"; // Specifica che questo è un componente client

import "../app/home.css";

export default async function Course_Page({ searchParams }) {
    console.log("searchParams ricevuti:", searchParams); // Log iniziale per verificare i parametri
    let id;

    try {
        // Controlla e decodifica il valore di `searchParams`
        if (typeof searchParams?.value === "string") {
            const parsedValue = JSON.parse(searchParams.value); // Decodifica il JSON
            id = parsedValue.id; // Estrai l'ID dal JSON
        } else {
            id = searchParams?.id; // Se l'ID è già presente direttamente
        }
    } catch (error) {
        console.error("Errore durante la decodifica dei parametri:", error);
        return <div>Errore nei parametri del corso.</div>;
    }

    if (!id) {
        console.error("ID del corso non trovato nei parametri:", searchParams); // Log aggiuntivo
        return <div>ID del corso non fornito.</div>;
    }

    console.log("ID del corso decodificato:", id); // Log per confermare l'ID

    try {
        const res = await fetch(`https://ingegneria-del-software-phcc.onrender.com/api/courses/${id}`, {
            cache: "no-store", // Evita il caching
        });

        if (!res.ok) {
            throw new Error(`Errore HTTP: ${res.status}`);
        }

        const course = await res.json();

        if (!course) {
            return <div>Corso non trovato.</div>;
        }

        console.log("Dati del corso ricevuti:", course); // Log per verificare i dati del corso

        return (
            <div className="course-card">
                <div className="course-header">
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>
                </div>
                <div className="course-content">
                    <p>Autore: {course.author}</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Errore durante il caricamento del corso:", error);
        return <div>Errore durante il caricamento del corso.</div>;
    }
}






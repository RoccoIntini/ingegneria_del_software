"use client"; // Specifica che questo è un componente client

import "../app/home.css";

export default async function Course_Page({ searchParams }) {
    let id;

    try {
        // Decodifica `searchParams` se è un oggetto complesso
        if (typeof searchParams === "string") {
            const parsedParams = JSON.parse(searchParams);
            id = parsedParams.id;
        } else if (searchParams?.id) {
            id = searchParams.id;
        } else {
            throw new Error("Parametri non validi");
        }
    } catch (error) {
        console.error("Errore durante la decodifica dei parametri:", error);
        return <div>Errore nei parametri del corso.</div>;
    }

    if (!id) {
        return <div>ID del corso non fornito.</div>;
    }

    try {
        const res = await fetch(`https://ingegneria-del-software-phcc.onrender.com/api/courses/${id}`, {
            cache: "no-store", // Evita il caching
        });

        if (!res.ok) {
            throw new Error("Errore nel caricamento del corso");
        }

        const course = await res.json();

        if (!course) {
            return <div>Corso non trovato.</div>;
        }

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




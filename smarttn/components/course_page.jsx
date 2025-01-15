"use client"; // Specifica che questo è un componente client

import "../app/home.css";

export default async function coursePage({ searchParams }) {
    console.log("searchParams:", searchParams);
    const id = searchParams?.id;

    if (!id) {
        return <div>ID del corso non fornito.</div>;
    }

    try {
        const res = await fetch(`https://ingegneria-del-software-phcc.onrender.com/api/courses/${id}`, {
            cache: "no-store", // Evita il caching per ottenere sempre i dati più aggiornati
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
        console.error(error);
        return <div>Errore durante il caricamento del corso.</div>;
    }
}



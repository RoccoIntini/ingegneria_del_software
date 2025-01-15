"use client"; // Specifica che questo è un componente client

import { useEffect, useState } from "react";
import "../app/home.css";

export default function Course_Page({ searchParams }) {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("searchParams ricevuti:", searchParams); // Per debug iniziale
        let id;

        try {
            // Decodifica `searchParams` solo se necessario
            if (typeof searchParams?.value === "string") {
                const parsedValue = JSON.parse(searchParams.value);
                id = parsedValue.id;
            } else {
                id = searchParams?.id;
            }

            if (!id) {
                throw new Error("ID del corso non trovato nei parametri");
            }
        } catch (err) {
            console.error("Errore durante la decodifica dei parametri:", err);
            setError("Errore nei parametri del corso.");
            setLoading(false);
            return;
        }

        // Recupera i dati del corso
        const fetchCourse = async () => {
            try {
                const res = await fetch(`https://ingegneria-del-software-phcc.onrender.com/api/courses/${id}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error(`Errore HTTP: ${res.status}`);
                }

                const data = await res.json();
                console.log("Dati del corso ricevuti:", data);
                setCourse(data);
            } catch (err) {
                console.error("Errore durante il caricamento del corso:", err);
                setError("Errore durante il caricamento del corso.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [searchParams]); // Assicura che l'effetto venga eseguito solo quando `searchParams` cambia

    if (loading) {
        return <div>Caricamento...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
}







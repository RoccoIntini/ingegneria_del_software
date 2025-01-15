"use client"; // Dichiarazione per indicare che è un componente client

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../app/home.css";

export default function coursePage() {
    const router = useRouter();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id"); // Estrai l'ID dai parametri della query string

    useEffect(() => {
        if (id) {
            fetch(`/api/courses/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Errore nel caricamento del corso");
                    }
                    return res.json();
                })
                .then((data) => {
                    setCourse(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div>Caricamento...</div>;
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
                {/* Mostra altri dettagli del corso */}
            </div>
        </div>
    );
}


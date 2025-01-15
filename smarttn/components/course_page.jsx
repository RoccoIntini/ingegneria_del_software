import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../app/home.css";

export default function coursePage() {
    const router = useRouter();
    const { id } = router.query; // Estrae l'ID dalla query string

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/courses/[id]/${id}`)
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

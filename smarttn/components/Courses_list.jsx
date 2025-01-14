import { HiPencilAlt } from "react-icons/hi";
import { RemoveBtnCourse } from "./RemoveBtn";
import Link from 'next/link';


const getCourses = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/courses', {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Errore durante il caricamento dei corsi: " + res.statusText);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Errore durante il caricamento dei corsi:", error);
        return { courses: [] }; // Ritorna un array vuoto in caso di errore
    }
};


; export default async function Courses_list() {
    const data = await getCourses();

    const { courses } = data;
    if (!courses || courses.length === 0) {
        return <div>Nessun corso trovato.</div>;
    } return (
        <> 
        <div className="text-3xl font-bold py-3">Elenco dei corsi</div>
        {courses.map((c) => (
            <div key={c._id} className="p-4 border border-slate-300 my-3 flex items-start justify-between gap-5">
                <div>
                    <h2 className="font-bold text-2xl">
                        {c.title}
                    </h2>
                    <div>
                        {c.description}
                    </div>
                    <div>
                        {c.author}
                    </div>
                </div>
                <div className="flex gap-2">
                    <RemoveBtnCourse id={c._id} />
                    <Link href={`/edit-account/${c._id}`}>
                        <HiPencilAlt size={24} />
                    </Link>
                </div>
            </div>
        ))} </>);
}
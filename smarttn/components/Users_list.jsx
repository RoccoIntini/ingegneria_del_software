import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import { RemoveBtnUser } from "./RemoveBtn";

const getUsers = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/users", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return res.json();
    } catch (error) {
        console.error("Errore durante il caricamento degli utenti:", error);
        return { users: [] }; // Restituisce un array vuoto in caso di errore
    }
};

export default async function Users_list() {
    const { users } = await getUsers();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista Utenti</h1>

            {users.length === 0 ? (
                <p className="text-gray-500">Nessun utente trovato.</p>
            ) : (
                users.map((u) => (
                    <div
                        key={u._id}
                        className="p-4 border border-slate-300 my-3 flex items-start justify-between gap-5"
                    >
                        <div>
                            <h2 className="font-bold text-2xl">{u.username}</h2>
                            <div className="text-gray-500">Ruolo: {u.role}</div>
                            {u.courseHistory?.length > 0 && (
                                <ul className="mt-2 text-gray-700">
                                    {u.courseHistory.map((course, index) => (
                                        <li key={index}>- {course}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <RemoveBtnUser id={u._id} />
                            <Link href={`/edit-account/${u._id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

import { HiPencilAlt } from "react-icons/hi";
import Link from 'next/link';
import { RemoveBtnUser } from "./RemoveBtn";


const getUsers = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/users', {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return res.json();

    } catch (error) {
        console.log("Errore durante il caricamento degli utenti", error);
    }


}

export default async function Users_list() {

    const { users } = await getUsers();

    return (
        <>
            {users.map((u) => (
                <div className="p-4 boder border-slate-300 my-3 flex items-start justify-between gap-5 ">
                    <div>
                        <h2 className="font-bold text-2xl">{u.username}</h2>
                        <div>{u.role}</div>
                    </div>

                    <div className="flex gap-2">
                        <RemoveBtnUser id={u._id}/>
                        <Link href={`/edit-account/${u._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>


                    </div>
                </div>
            ))}
        </>
    )
}
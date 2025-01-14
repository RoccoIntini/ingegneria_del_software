'use client';

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export function RemoveBtnUser({ id }) {
    const router = useRouter();

    const removeUser = async () => {
        const confirmed = confirm("Sei sicuro di voler eliminare questo utente?");
        
        if (confirmed) {
            const res = await fetch(`https://ingegneria-del-software-phcc.onrender.com/api/users?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                console.error("Failed to delete user");
            }
        }
    };

    return (
        <button onClick={removeUser} className="text-red-500">
            <HiOutlineTrash size={24} />
        </button>
    );
}

export function RemoveBtnCourse({ id }) {
    const router = useRouter();

    const removeCourse = async () => {
        const confirmed = confirm("Sei sicuro di voler eliminare questo corso?");
        
        if (confirmed) {
            const res = await fetch(`https://ingegneria-del-software-phcc.onrender.com/api/courses?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                console.error("Failed to delete course");
            }
        }
    };

    return (
        <button onClick={removeCourse} className="text-red-500">
            <HiOutlineTrash size={24} />
        </button>
    );
}

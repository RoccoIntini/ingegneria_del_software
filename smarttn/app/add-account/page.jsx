'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("L'username e la Password sono obbligatori");
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ username, password, role }),


            });

            if (res.ok) {
                router.push('/');
            } else {
                throw new Error("Creazione dell'utente fallita");

            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 py-5">Aggiungi un nuovo utente</h2>

            <form onSubmit={handleSubmit} className="border border-slate-800 flex flex-col gap-11 py-10 px-10 bg-red-300 rounded-lg">
                <div className="flex items-center gap-12">
                    <div className="pr-10">
                        <input onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="border border-slate-500 py-2 px-10 text-xl rounded-s text-red-600"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="pl-10">
                        <input onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="border border-slate-500 px-10 py-2 text-xl rounded-s text-red-600"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                </div>

                {/* Sfondo bianco per la select */}
                <select
                    onChange={(e) => setRole(e.target.value)} // Move onChange here to the select element
                    value={role}
                    className="border border-slate-500 text-xl max-w-3xl rounded-s h-15 py-2 text-red-600 bg-white"
                >
                    <option value="user" className="text-red">User</option>
                    <option value="poweruser" className="text-red">Power user</option>
                </select>


                <button type="submit" className="border border-slate-800 rounded-s max-w-3xl bg-red-600 font-bold text-white py-2 px-4 m text-xl">
                    Aggiungi utente
                </button>
            </form>
        </div>
    );
}
